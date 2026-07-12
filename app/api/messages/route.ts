import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const MESSAGES_FILE = path.resolve(process.cwd(), "data/messages.json");

// Helper to ensure the file exists
async function ensureFileExists() {
  try {
    await fs.access(MESSAGES_FILE);
  } catch (error) {
    // If file doesn't exist, create it with an empty array
    await fs.writeFile(MESSAGES_FILE, "[]", "utf-8");
  }
}

export async function GET() {
  try {
    await ensureFileExists();
    const file = await fs.readFile(MESSAGES_FILE, "utf-8");
    const messages = JSON.parse(file);
    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error reading messages:", error);
    return NextResponse.json({ error: "Failed to read messages" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate basic fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newMessage = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      message: data.message,
      date: new Date().toISOString(),
      read: false
    };

    await ensureFileExists();
    const file = await fs.readFile(MESSAGES_FILE, "utf-8");
    const messages = JSON.parse(file);
    
    // Add new message at the beginning
    messages.unshift(newMessage);
    
    await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf-8");

    return NextResponse.json({ success: true, message: newMessage });
  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
  }
}

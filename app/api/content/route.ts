import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const CONTENT_PATH = path.resolve(process.cwd(), "data/content.json");

export async function GET() {
  try {
    const data = await fs.readFile(CONTENT_PATH, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error("Error reading content:", error);
    return NextResponse.json({ error: "Failed to load content" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { password, content } = await request.json();

    // Simple hardcoded password for demo/local use
    if (password !== "admin123") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await fs.writeFile(CONTENT_PATH, JSON.stringify(content, null, 2), "utf-8");
    return NextResponse.json({ message: "Content updated successfully" });
  } catch (error: any) {
    console.error("Error updating content:", error);
    return NextResponse.json({ error: error.message || "Failed to save content" }, { status: 500 });
  }
}

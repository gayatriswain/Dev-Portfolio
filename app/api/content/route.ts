import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import clientPromise from "@/lib/mongodb";

const CONTENT_PATH = path.resolve(process.cwd(), "data/content.json");

export async function GET() {
  try {
    if (process.env.MONGODB_URI) {
      const client = await clientPromise;
      const db = client.db("portfolio");
      const content = await db.collection("content").findOne({ _id: "main_content" });
      
      if (content) {
        // Return without _id
        const { _id, ...rest } = content;
        return NextResponse.json(rest);
      }
    }
    
    // Fallback to local file if no MongoDB URI or document not found
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

    if (password !== "admin123") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (process.env.MONGODB_URI) {
      const client = await clientPromise;
      const db = client.db("portfolio");
      
      await db.collection("content").updateOne(
        { _id: "main_content" },
        { $set: content },
        { upsert: true }
      );
      
      return NextResponse.json({ message: "Content updated successfully in MongoDB!" });
    } else {
      // Fallback to local file
      await fs.writeFile(CONTENT_PATH, JSON.stringify(content, null, 2), "utf-8");
      return NextResponse.json({ message: "Content updated successfully locally" });
    }
  } catch (error: any) {
    console.error("Error updating content:", error);
    return NextResponse.json({ error: error.message || "Failed to save content" }, { status: 500 });
  }
}

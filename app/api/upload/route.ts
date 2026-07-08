import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Create a unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const originalExt = path.extname(file.name);
    const filename = `upload-${uniqueSuffix}${originalExt}`;
    
    // Ensure the uploads directory exists
    const uploadsDir = path.resolve(process.cwd(), "public/uploads");
    try {
      await fs.access(uploadsDir);
    } catch {
      await fs.mkdir(uploadsDir, { recursive: true });
    }

    // Save the file
    const filePath = path.join(uploadsDir, filename);
    await fs.writeFile(filePath, buffer);

    // Return the public URL
    const fileUrl = `/uploads/${filename}`;
    
    return NextResponse.json({ 
      message: "File uploaded successfully",
      url: fileUrl 
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}

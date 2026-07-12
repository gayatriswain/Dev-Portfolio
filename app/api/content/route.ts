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

    const contentString = JSON.stringify(content, null, 2);

    if (process.env.NODE_ENV === 'production') {
      const token = process.env.GITHUB_TOKEN;
      const repo = process.env.GITHUB_REPO; // e.g. "gayatriswain/Dev-Portfolio"
      const branch = process.env.GITHUB_BRANCH || "main";

      if (!token || !repo) {
        return NextResponse.json({ error: "GitHub credentials missing for live updates. Please set GITHUB_TOKEN and GITHUB_REPO in Vercel." }, { status: 500 });
      }

      // 1. Get current file sha
      const getFileResponse = await fetch(`https://api.github.com/repos/${repo}/contents/data/content.json?ref=${branch}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Dev-Portfolio-CMS",
        },
      });

      if (!getFileResponse.ok) {
         throw new Error("Failed to fetch file from GitHub");
      }
      
      const fileData = await getFileResponse.json();
      const sha = fileData.sha;

      // 2. Update file
      const updateResponse = await fetch(`https://api.github.com/repos/${repo}/contents/data/content.json`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Dev-Portfolio-CMS",
        },
        body: JSON.stringify({
          message: "Update content via admin panel",
          content: Buffer.from(contentString).toString("base64"),
          sha: sha,
          branch: branch
        })
      });

      if (!updateResponse.ok) {
        throw new Error("Failed to update file on GitHub");
      }
      
      return NextResponse.json({ message: "Content updated successfully on live site!" });

    } else {
      // Local development
      await fs.writeFile(CONTENT_PATH, contentString, "utf-8");
      return NextResponse.json({ message: "Content updated successfully locally" });
    }

  } catch (error: any) {
    console.error("Error updating content:", error);
    return NextResponse.json({ error: error.message || "Failed to save content" }, { status: 500 });
  }
}

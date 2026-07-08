import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import FloatingContact from "@/components/FloatingContact";

const inter = Inter({ subsets: ["latin"] });

import fs from "fs/promises";
import path from "path";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const dataPath = path.resolve(process.cwd(), "data/content.json");
    const file = await fs.readFile(dataPath, "utf-8");
    const content = JSON.parse(file);
    return {
      title: content.seo?.title || "Fusion Starter Portfolio",
      description: content.seo?.description || "A production-ready full-stack portfolio",
    };
  } catch (error) {
    return {
      title: "Fusion Starter Portfolio",
      description: "A production-ready full-stack portfolio",
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <FloatingContact />
        </Providers>
      </body>
    </html>
  );
}

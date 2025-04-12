import type { Metadata } from "next";
import { Prompt, Noto_Sans } from "next/font/google";
import "./globals.css";

const promptFont = Prompt({
  variable: "--font-prompt",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "คำศัพท์ภาษาอังกฤษ | English Vocabulary Game",
  description: "ฝึกฝนคำศัพท์ภาษาอังกฤษด้วยเกมสนุกๆ ที่ช่วยให้คุณเรียนรู้ได้ดีขึ้น",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${promptFont.variable} ${notoSans.variable} font-thai antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

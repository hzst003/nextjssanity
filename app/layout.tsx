import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "办公自动化解决方案",
  description: "专注办公自动化解决方案，帮助企业减少人工操作、降低错误率、提升处理效率。资料自动处理、流程标准化、一键提交。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

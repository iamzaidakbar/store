import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import Navbar from '@/components/layout/Navbar'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-commerce Store",
  description: "Modern e-commerce store built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
<<<<<<< HEAD
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <div className="min-h-screen bg-white dark:bg-black transition-colors pt-16">
            {children}
          </div>
        </ThemeProvider>
=======
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
>>>>>>> 771b483 (Remove unused test files, global CSS, and deprecated components; update Navbar for improved navigation and styling)
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideNav from "./ui/sidenav";
import SideNavigation from "./ui/sidenavigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PoE-JP",
  description: "Path of Exile Japan Community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <SideNavigation />
        </div>
        {children}
      </body>
    </html>
  );
}

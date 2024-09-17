import { Inter } from "next/font/google";
import Header from "../../components/header";


const inter = Inter({ subsets: ["latin"] });

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <body className={inter.className}>
      <Header />
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {children}
        </div>
      </body>
    </html>
  );
}

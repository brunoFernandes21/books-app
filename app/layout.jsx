import Navbar from "./components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from '@/app/context/AuthContext'
import { Poppins } from 'next/font/google'
const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "Books-Buzz",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} main relative`}>
        <AuthProvider>
        <Navbar/>
          <main className="px-5 md:px-20 lg:px-40">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}

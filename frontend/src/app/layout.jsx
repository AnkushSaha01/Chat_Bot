import "./globals.css";
import { Inter } from "next/font/google";
import StoreProvider from "../store/StoreProvider";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Chat App",
  description: "Use me!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}

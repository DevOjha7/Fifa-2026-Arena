import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "FIFA 2026 Arena | Predict the Future",
  description: "Join millions of football fans predicting FIFA World Cup 2026 results. Climb the global leaderboard and win legendary prizes.",
  keywords: "FIFA 2026, World Cup, predictions, leaderboard, football",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col antialiased relative bg-[#0D1042]">
        <Navigation />
        <div className="flex-1 pt-16 pb-16 md:pb-0">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}

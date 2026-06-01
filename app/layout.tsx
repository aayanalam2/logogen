import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Logogen",
  description: "Generate a distinctive logo for your brand.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSerif.variable} ${geistSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

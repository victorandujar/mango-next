import { Geist, Geist_Mono } from "next/font/google";
import Header from "./components/Header/Header";
import rangeServices from "./services";
import React from "react";
import "./globals.css";
import { RangeProvider } from "./contexts/RangeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mango Range App",
  description: "Range compos for Mango test",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const minMax = rangeServices.getMinMaxValues();
  const range = rangeServices.getRangeValues();

  const [minMaxValues, values] = await Promise.all([minMax, range]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RangeProvider minMaxValues={minMaxValues} values={values}>
          <Header />
          {children}
        </RangeProvider>
      </body>
    </html>
  );
}

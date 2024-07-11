import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"
import ToasterProvider from "@/components/toaster-provides"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Active Apply",
  description: "Easily track where you apply",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        {children}
      </body>
    </html>
  )
}

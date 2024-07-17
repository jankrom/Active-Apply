import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"
import ToasterProvider from "@/components/toaster-provides"
import CrispProvider from "@/components/crisp-provider"

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
      <CrispProvider />
      <body className={`bg-[#111827] ${inter.className}`}>
        <ToasterProvider />
        {children}
      </body>
    </html>
  )
}

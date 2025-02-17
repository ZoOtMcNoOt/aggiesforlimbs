import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { getData } from "@/lib/cms"
import { ENV } from "@/lib/constants"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react" 

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Aggies for Limbs",
  description: "Texas A&M University student organization raising funds for prosthetics",
  url: ENV.SITE_URL,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const data = getData()
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-dark`}>
        <Header siteInfo={data.siteInfo} navigation={data.navigation} />
        <main className="min-h-screen">
          {children}
          <SpeedInsights />
          <Analytics />
        </main>
        <Footer siteInfo={data.siteInfo} socialMedia={data.socialMedia} />
        
      </body>
    </html>
  )
}

import "./globals.css"
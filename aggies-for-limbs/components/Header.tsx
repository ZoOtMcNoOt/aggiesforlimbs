"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const Header = ({ siteInfo, navigation }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 bg-navy ${
          scrolled ? "shadow-lg py-2" : "py-2 sm:py-4"
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-2 sm:px-4 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aggiesforlimbs_wixsite_com_home_img_5_logo.jpg-er902cVGPqH95z0dplzWEgdtS3Jj9q.jpeg"
              alt="Aggies for Limbs Logo"
              width={28}
              height={28}
              className="rounded-lg mr-2"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=28&width=28"
              }}
            />
            <div className="text-white hidden sm:block">
              <h1 className="text-sm font-bold leading-tight whitespace-nowrap">{siteInfo.name}</h1>
              <p className="text-xs opacity-90 whitespace-nowrap">{siteInfo.university}</p>
            </div>
          </Link>
          <nav className="hidden lg:block">
            <ul className="flex space-x-4 lg:space-x-6">
              {navigation.map((item) => (
                <li key={item.path}>
                  <Link href={item.path} className="text-white hover:text-teal transition-colors duration-300 text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Button
            className="lg:hidden text-white p-1"
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </header>
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-navy/95 lg:hidden">
          <nav className="h-full flex flex-col justify-center items-center">
            <ul className="space-y-6">
              {navigation.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="text-white hover:text-teal transition-colors duration-300 text-xl"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
      <div className="h-14 sm:h-16 lg:h-20"></div> {/* Spacer to prevent content overlap */}
    </>
  )
}

export default Header
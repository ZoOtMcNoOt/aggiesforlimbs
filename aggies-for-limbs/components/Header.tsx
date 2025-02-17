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
        className={`fixed w-full z-50 transition-all duration-300 bg-navy ${scrolled ? "shadow-lg py-2" : "py-4"}`}
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <Link href="/" className="flex items-center -ml-1 sm:-ml-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aggiesforlimbs_wixsite_com_home_img_5_logo.jpg-er902cVGPqH95z0dplzWEgdtS3Jj9q.jpeg"
                alt="Aggies for Limbs Logo"
                width={32}
                height={32}
                className="rounded-lg mr-2"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=32&width=32"
                }}
              />
              <div className="text-white">
                <h1 className="text-sm font-bold leading-tight whitespace-nowrap">{siteInfo.name}</h1>
                <p className="text-xs opacity-90 whitespace-nowrap">{siteInfo.university}</p>
              </div>
            </Link>
            <nav className="hidden md:block">
              <ul className="flex space-x-6 sm:space-x-8">
                {navigation.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className="text-white hover:text-teal transition-colors duration-300 text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Button
              className="md:hidden text-white"
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-navy/95 md:hidden">
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
      <div className="h-16 sm:h-20"></div> {/* Spacer to prevent content overlap */}
    </>
  )
}

export default Header


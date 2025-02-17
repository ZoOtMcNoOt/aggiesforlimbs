import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXTwitter } from "@fortawesome/free-brands-svg-icons"

const Footer = ({ siteInfo, socialMedia }) => {
  return (
    <footer className="bg-gray-light py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h3 className="text-lg font-bold mb-2">{siteInfo.name}</h3>
            <p>{siteInfo.university}</p>
            <p>Est. {siteInfo.established}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <h3 className="text-lg font-bold mb-2 text-center md:text-left">
              Connect With Us
            </h3>
            <div className="flex space-x-4 justify-center md:justify-start">
              <Link
                href={socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-maroon"
              >
                <Facebook />
              </Link>
              <Link
                href={socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-maroon"
              >
                <Instagram />
              </Link>
              <Link
                href={socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-maroon"
              >
                <FontAwesomeIcon icon={faXTwitter} className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} {siteInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer


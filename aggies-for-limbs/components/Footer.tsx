import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"

// New Twitter (X) icon as an inline React component
const NewTwitterIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="24"
    height="24"
    fill="currentColor"
    {...props}
  >
    <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm8.485 27.071l-2.828 2.829L24 26.828l-5.657 5.657-2.829-2.829L21.172 24 15.515 18.343l2.829-2.829L24 21.172l5.657-5.657 2.829 2.829L26.828 24l5.657 5.657z"/>
  </svg>
)

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
            <h3 className="text-lg font-bold mb-2 text-center md:text-left">Connect With Us</h3>
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
                <NewTwitterIcon />
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


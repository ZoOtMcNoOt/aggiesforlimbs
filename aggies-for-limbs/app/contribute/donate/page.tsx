import { getData } from "@/lib/cms"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Mail, ExternalLink } from "lucide-react"

export default function DonatePage() {
  const data = getData()
  const contribute = data?.contribute || {}

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-navy mb-8 text-center">Donate to Aggies for Limbs</h1>

      <div className="max-w-4xl mx-auto space-y-8">
        <p className="text-xl text-gray-600 text-center mb-8">
          Thank you for considering a donation to Aggies for Limbs. Your support helps us provide prosthetics to those
          in need, allowing them to take their "second first steps".
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* General Donation Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-navy">General Donation</CardTitle>
              <CardDescription>Support our cause and help others have a second chance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                We accept monetary donations to support our mission. Your donation is tax-deductible as we are a
                non-profit organization. Please fill out the form and send both payment and form to the address listed.
              </p>
              <div className="flex justify-between items-center">
                <Button asChild variant="outline">
                  <Link href={contribute.generalDonation?.formLink || "#"} download>
                    <Download className="mr-2 h-4 w-4" /> Download Form
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="mailto:aggies4limbs.president@gmail.com">
                    <Mail className="mr-2 h-4 w-4" /> Contact Us
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Event Sponsorship Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-navy">Event Sponsorship</CardTitle>
              <CardDescription>Sponsor our upcoming events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                We host various events throughout the year. Donations of $100 or more received by the specified deadline
                will have their company logo or family name featured on the event shirt.
              </p>
              <div className="flex justify-between items-center">
                <Button asChild variant="outline">
                  <Link href={contribute.eventSponsorship?.formLink || "#"} download>
                    <Download className="mr-2 h-4 w-4" /> Download Form
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="mailto:aggies4limbs.io@gmail.com">
                    <Mail className="mr-2 h-4 w-4" /> Contact Us
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-navy">Item Donations</CardTitle>
            <CardDescription>Donate food, drinks, or other items for our events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              We also accept donations of food, drinks, or other items that can be used at our events. These donations
              are also tax-deductible. Please fill out the form and we will coordinate the pickup or drop-off of your
              donated items.
            </p>
            <div className="flex justify-between items-center">
              <Button asChild variant="outline">
                <Link href="/item-donation-form.pdf" download>
                  <Download className="mr-2 h-4 w-4" /> Download Form
                </Link>
              </Button>
              <Button asChild>
                <Link href="mailto:aggies4limbs.io@gmail.com">
                  <Mail className="mr-2 h-4 w-4" /> Contact Us
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Aggies for Limbs | Founded 2016 at Texas A&M University</p>
          <div className="flex justify-center space-x-4">
            <Link href="https://www.ashtonsangels.com" target="_blank" rel="noopener noreferrer">
              <Button variant="link" className="text-teal hover:text-navy">
                Ashton's Angels website <ExternalLink className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            <Link href="http://aggiesforlimbs.wixsite.com/home" target="_blank" rel="noopener noreferrer">
              <Button variant="link" className="text-teal hover:text-navy">
                Aggies for Limbs website <ExternalLink className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


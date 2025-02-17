import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

export default function ContributePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div id="top" />
      <h1 className="text-3xl md:text-4xl font-bold text-navy mb-8 text-center">Contribute to Aggies for Limbs</h1>

      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardContent className="p-6">
            <p className="text-gray-600 mb-4">
              Aggies for Limbs was founded in 2016 at Texas A&M University. Our mission is to raise money for the local
              non-profit called Ashton's Angels, which provides prosthetics for those who cannot afford them. Their
              purpose is to get people back up on their feet so they can continue providing for themselves and their
              families.
            </p>
            <p className="text-gray-600 mb-4">
              Currently, nine Angels have been given their "second first steps" with the help of Aggies for Limbs. With
              our help, Ashton's Angels will be able to provide even more prosthetics to those in need. Last year,
              Aggies for Limbs was able to raise over $10,000 for our most recent Angel!
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          {/* General Donation Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-navy">General Donation</CardTitle>
              <CardDescription>Support our cause with a financial contribution</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Your general donation helps us continue our mission of providing prosthetics to those in need. Every
                contribution, no matter the size, makes a difference.
              </p>
              <Link href="/contribute/general-donation#top">
                <Button className="w-full bg-navy hover:bg-navy/90 text-white">
                  Make a General Donation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Event Donation Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-navy">Event Donation</CardTitle>
              <CardDescription>Support our upcoming events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Donate to support our upcoming events. Your contribution helps us organize fundraisers and awareness
                campaigns that directly benefit our cause.
              </p>
              <Link href="/contribute/event-donation#top">
                <Button className="w-full bg-teal hover:bg-teal/90 text-white">
                  Make an Event Donation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


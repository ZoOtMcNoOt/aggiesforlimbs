import { getEventById } from "@/lib/cms"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, MapPin, Timer, Trophy, Gift, ChevronLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function EventPage({ params }: { params: { id: string } }) {
  const event = getEventById(params.id)

  if (!event) {
    notFound()
  }

  const eventDate = new Date(event.date)
  const isPastEvent = new Date() > eventDate

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/events">
        <Button variant="ghost" className="mb-6">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Button>
      </Link>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-navy mb-4">{event.title}</h1>
          <div className="space-y-4 text-gray-600">
            <p className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-teal" />
              {eventDate.toLocaleDateString()}
            </p>
            {event.schedule && (
              <p className="flex items-center gap-2">
                <Timer className="h-5 w-5 text-teal" />
                Check-in: {event.schedule.checkIn}, Start: {event.schedule.raceStart}
              </p>
            )}
            <p className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-teal" />
              {event.location.name}, {event.location.address}, {event.location.city}, {event.location.state}
            </p>
          </div>
          <p className="mt-6 text-lg text-gray-600">{event.description}</p>

          {/* Features Card */}
          {event.features && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-navy">Event Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {event.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="bg-gray-100">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Rest of the content... */}
          {event.tickets && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-navy">Ticket Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {event.tickets.earlyBird && (
                  <div>
                    <h3 className="font-semibold mb-2">Early Bird</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Until {new Date(event.tickets.earlyBird.endDate).toLocaleDateString()}
                    </p>
                    <ul className="list-disc list-inside text-gray-600">
                      {event.tickets.earlyBird.options?.map((option, index) => (
                        <li key={index}>
                          {option.name}: ${option.price}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {event.tickets.general && (
                  <div>
                    <h3 className="font-semibold mb-2">General Admission</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {new Date(event.tickets.general.startDate).toLocaleDateString()} -{" "}
                      {new Date(event.tickets.general.endDate).toLocaleDateString()}
                    </p>
                    <ul className="list-disc list-inside text-gray-600">
                      {event.tickets.general.options?.map((option, index) => (
                        <li key={index}>
                          {option.name}: ${option.price}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {event.outcome && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-teal" />
                  Event Outcome
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {event.outcome.amountRaised && (
                    <p className="text-xl font-bold text-navy">${event.outcome.amountRaised.toLocaleString()} Raised</p>
                  )}
                  <ul className="list-disc list-inside text-gray-600">
                    {Object.entries(event.outcome)
                      .filter(([key]) => key !== "amountRaised")
                      .map(([key, value]) => (
                        <li key={key}>{value}</li>
                      ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          {/* Gallery Images */}
          {event.gallery && event.gallery.length > 0 ? (
            event.gallery.map((image, index) => (
              <div key={index} className="relative w-full aspect-[16/9] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={image.url || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))
          ) : event.imageUrl ? (
            <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={event.imageUrl || "/placeholder.svg"}
                alt={event.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          ) : null}

          {/* Donation Information Card */}
          {!isPastEvent && event.donationInfo && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-teal" />
                  Donation Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Donate ${event.donationInfo.threshold} or more to have your name/logo featured on the event t-shirt!
                </p>
                <p className="text-sm text-gray-600">Example: {event.donationInfo.example}</p>
                <p className="text-sm text-gray-600">
                  Deadline: {new Date(event.donationInfo.deadline).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  For tax-exempt forms, email:{" "}
                  <a href={`mailto:${event.donationInfo.taxExemptEmail}`} className="text-teal hover:underline">
                    {event.donationInfo.taxExemptEmail}
                  </a>
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}


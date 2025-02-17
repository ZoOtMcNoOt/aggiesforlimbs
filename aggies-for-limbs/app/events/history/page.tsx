import { getData } from "@/lib/cms"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin } from "lucide-react"
import Link from "next/link"

export default function EventHistory() {
  const { events } = getData()
  const historicalEvents = Object.values(events)
    .filter((event) => event.type === "Historical Event")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-navy">Historical Events</h1>
      <div className="grid gap-8">
        {historicalEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6">
              {event.gallery && event.gallery[0] && (
                <div className="relative aspect-video">
                  <Image
                    src={event.gallery[0].url || "/placeholder.svg"}
                    alt={event.gallery[0].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}
              <div className="p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-2xl font-bold text-navy">{event.title}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-2 mt-2">
                      <Calendar className="h-4 w-4 text-teal" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2 mt-2">
                        <MapPin className="h-4 w-4 text-teal" />
                        <span>
                          {event.location.name}, {event.location.city}, {event.location.state}
                        </span>
                      </div>
                    )}
                  </CardDescription>
                </CardHeader>
                <p className="text-gray-600 mb-4">{event.description}</p>
                {event.outcome && (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-navy">Event Highlights:</h3>
                    <ul className="list-disc list-inside text-gray-600">
                      {Object.entries(event.outcome).map(([key, value]) => (
                        <li key={key}>{value}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-6">
                  <Link href={`/events/${event.id}`}>
                    <Button className="bg-teal hover:bg-teal/90 text-white">View Details</Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}


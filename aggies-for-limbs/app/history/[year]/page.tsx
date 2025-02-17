import { getData } from "@/lib/cms"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import Link from "next/link"

export default function YearPage({ params }: { params: { year: string } }) {
  const { events } = getData()
  const yearEvents = Object.values(events).filter(
    (event) => new Date(event.date).getFullYear().toString() === params.year,
  )

  if (yearEvents.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">No events found for {params.year}</h1>
        <Link href="/history">
          <Button variant="outline">Back to History</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-navy mb-8">{params.year} Events & Activities</h1>

      <div className="grid gap-8">
        {yearEvents.map((event) => (
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
                      <span>
                        {new Date(event.date).toLocaleDateString()}
                        {event.endDate && ` - ${new Date(event.endDate).toLocaleDateString()}`}
                      </span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <p className="text-gray-600 mb-4">{event.description}</p>
                {event.highlights && (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-navy">Highlights:</h3>
                    <ul className="list-disc list-inside text-gray-600">
                      {event.highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
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


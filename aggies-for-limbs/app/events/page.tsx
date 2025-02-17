import { getEvents } from "@/lib/cms"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const standardizeEventName = (title: string, date: string) => {
  const year = new Date(date).getFullYear()
  const baseName = title
    .replace(/(?:\d+(?:st|nd|rd|th)\s+)?Annual\s+/, "")
    .replace(/\s+\d{4}$/, "")
    .trim()
  return `${baseName} ${year}`
}

const TimelineEvent = ({ event, isPast, isLeft = false }) => (
  <div className="relative mb-16">
    {/* Timeline dot */}
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-teal border-4 border-white shadow-md z-10" />

    {/* Content container */}
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-8 items-center",
        isLeft ? "md:[&>*:first-child]:order-last" : "",
      )}
    >
      {/* Image container with fixed aspect ratio */}
      <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-lg">
        <Image
          src={event.imageUrl || "/placeholder.svg"}
          alt={`${event.title} event`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={!isPast} // Prioritize loading of upcoming event images
        />
      </div>

      {/* Content */}
      <div>
        <div className={cn("bg-white p-6 rounded-xl shadow-lg relative", isPast ? "opacity-80" : "")}>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-navy">{event.title}</h3>
            <div className="space-y-2">
              <p className="text-gray-600 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-teal" />
                {new Date(event.date).toLocaleDateString()}
              </p>
              {event.location && event.location.name && (
                <p className="text-gray-600 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-teal" />
                  {event.location.name}
                </p>
              )}
            </div>
            <p className="text-gray-600">{event.description}</p>
            <Link href={`/events/${event.id}`}>
              <Button className="w-full bg-teal hover:bg-teal/90 text-white">
                {isPast ? "View Details" : "Learn More"}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default function EventsPage() {
  const { allEvents } = getEvents()
  const now = new Date()

  // Group events by base name
  const groupedEvents = allEvents.reduce((acc, event) => {
    const baseName = event.title
      .replace(/(?:\d+(?:st|nd|rd|th)\s+)?Annual\s+/, "")
      .replace(/\s+\d{4}$/, "")
      .trim()
    if (!acc[baseName]) {
      acc[baseName] = []
    }
    acc[baseName].push(event)
    return acc
  }, {})

  // Sort and standardize event names
  const sortedEvents = Object.entries(groupedEvents)
    .flatMap(([baseName, events]) => {
      const sortedGroupEvents = events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      return sortedGroupEvents.map((event) => ({
        ...event,
        standardName: standardizeEventName(event.title, event.date),
      }))
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-navy mb-12 text-center">Events Timeline</h1>

      <div className="relative max-w-5xl mx-auto">
        {/* Connected timeline line */}
        <div className="absolute left-1/2 top-8 bottom-0 transform -translate-x-1/2 w-px bg-gray-200" />

        {sortedEvents.length > 0 ? (
          <div className="space-y-8">
            {sortedEvents.map((event, index) => (
              <TimelineEvent
                key={event.id}
                event={{ ...event, title: event.standardName }}
                isPast={new Date(event.date) < now}
                isLeft={index % 2 === 1}
              />
            ))}
          </div>
        ) : (
          <p className="text-xl text-gray-600 text-center">No events found. Please check back later.</p>
        )}
      </div>
    </div>
  )
}


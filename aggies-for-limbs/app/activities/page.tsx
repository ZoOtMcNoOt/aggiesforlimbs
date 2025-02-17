import { getData } from "@/lib/cms"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Users, Calendar } from "lucide-react"

export default function ActivitiesPage() {
  const data = getData()
  const activities = data?.activities || {}

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-navy mb-8">Social Activities</h1>

      <div className="grid gap-8">
        {activities.social && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-navy flex items-center gap-2">
                <Trophy className="h-6 w-6 text-teal" />
                <span>Intramural Sports</span>
              </CardTitle>
              <CardDescription>Join our competitive teams and have fun while staying active!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {activities.social.intramural?.sports.map((sport) => (
                  <div key={sport.name} className="space-y-4">
                    <h3 className="text-xl font-semibold text-navy">{sport.name}</h3>
                    <div className="text-gray-600 space-y-2">
                      <p className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-teal" />
                        <span>Seasons: {sport.seasons.join(", ")}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-teal" />
                        <span>{sport.location}</span>
                      </p>
                    </div>
                    {sport.gallery &&
                      sport.gallery.map((image, index) => (
                        <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                          <Image
                            src={image.url || "/placeholder.svg"}
                            alt={image.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activities.social?.events && (
          <div className="grid md:grid-cols-2 gap-8">
            {activities.social.events.map((semester) => (
              <Card key={semester.semester}>
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-navy">{semester.semester}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {semester.activities.map((activity, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-teal" />
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


import { Calendar, Share2, Users, MessageCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface VirtualCampaignProps {
  event: {
    title: string
    date: string
    endDate: string
    description: string
    features?: string[]
    socialMedia?: {
      hashtag: string
      handles: string[]
      platforms: string[]
    }
    type?: string
    engagement?: {
      posts: number
      duration: string
      format: string
    }
  }
}

export function VirtualCampaign({ event }: VirtualCampaignProps) {
  const startDate = new Date(event.date)
  const endDate = new Date(event.endDate)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-navy">Campaign Details</CardTitle>
          <CardDescription>
            <div className="flex items-center gap-2 mt-2">
              <Calendar className="h-4 w-4 text-teal" />
              <span>
                {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
              </span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">{event.description}</p>
          {event.features && (
            <div className="space-y-2">
              <h3 className="font-semibold text-navy">Campaign Features</h3>
              <div className="flex flex-wrap gap-2">
                {event.features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="bg-gray-100">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {event.socialMedia && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-teal" />
              Social Media
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {event.socialMedia.platforms.map((platform) => (
                <Badge key={platform} variant="outline">
                  {platform}
                </Badge>
              ))}
            </div>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-teal" />
                <span className="font-semibold">Hashtag:</span> #{event.socialMedia.hashtag}
              </p>
              <p className="flex items-center gap-2">
                <Users className="h-4 w-4 text-teal" />
                <span className="font-semibold">Handles:</span> {event.socialMedia.handles.join(", ")}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {event.engagement && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-navy">Campaign Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <dt className="text-sm text-gray-500">Duration</dt>
                <dd className="text-2xl font-bold text-navy">{event.engagement.duration}</dd>
              </div>
              <div className="space-y-1">
                <dt className="text-sm text-gray-500">Total Posts</dt>
                <dd className="text-2xl font-bold text-navy">{event.engagement.posts}</dd>
              </div>
              <div className="space-y-1">
                <dt className="text-sm text-gray-500">Format</dt>
                <dd className="text-2xl font-bold text-navy">{event.engagement.format}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      )}
    </div>
  )
}


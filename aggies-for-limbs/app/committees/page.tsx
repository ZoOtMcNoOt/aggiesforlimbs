import { getData } from "@/lib/cms"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2 } from "lucide-react"

export default function CommitteesPage() {
  const { committees } = getData()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-navy mb-4">Find Your Committee</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          During the semester each member will be assigned to one committee. Here is more about each committee and what
          to expect.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {committees.map((committee) => (
          <Card key={committee.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            {committee.imageUrl && (
              <div className="relative aspect-video">
                <Image
                  src={committee.imageUrl || "/placeholder.svg"}
                  alt={`${committee.name} Committee in action - ${committee.imageAlt}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-xl font-bold text-navy">{committee.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{committee.description}</p>
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-teal" />
                  Responsibilities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {committee.responsibilities.map((responsibility, index) => (
                    <Badge key={index} variant="secondary" className="bg-gray-100">
                      {responsibility}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


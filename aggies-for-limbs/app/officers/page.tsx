import { getData } from "@/lib/cms"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail } from "lucide-react"
import Link from "next/link"

// Helper function to determine if an officer is part of the executive board
const isExecutiveOfficer = (position: string) => {
  const executivePositions = ["President", "Vice President", "Treasurer", "Internal Operations"]
  return executivePositions.some((title) => position.includes(title))
}

export default function Officers() {
  const data = getData()
  const officers = data?.officers || []

  // Sort officers to put executive board first
  const sortedOfficers = [...officers].sort((a, b) => {
    if (isExecutiveOfficer(a.position) && !isExecutiveOfficer(b.position)) return -1
    if (!isExecutiveOfficer(a.position) && isExecutiveOfficer(b.position)) return 1
    return 0
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-navy mb-4">Spring 2025 Officer Team</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Meet the dedicated team leading Aggies for Limbs and making a difference in our community.
        </p>
      </div>

      <div className="mb-12">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aggiesforlimbs_wixsite_com_home_officers_img_2_group_picture.jpg-OqXnMnDXKmEuRkf3Vz9i3eRrBSPoM3.jpeg"
          alt="Aggies for Limbs Officer Team group photo showing officers in black polos giving thumbs up"
          width={1200}
          height={800}
          className="w-full rounded-xl shadow-lg object-cover max-h-[500px]"
          priority
        />
      </div>

      {/* Executive Board Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-navy mb-6 text-center">Executive Board</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedOfficers
            .filter((officer) => isExecutiveOfficer(officer.position))
            .map((officer, index) => (
              <OfficerCard key={index} officer={officer} isExecutive={true} />
            ))}
        </div>
      </div>

      {/* Committee Officers Section */}
      <div>
        <h2 className="text-2xl font-bold text-navy mb-6 text-center">Committee Officers</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedOfficers
            .filter((officer) => !isExecutiveOfficer(officer.position))
            .map((officer, index) => (
              <OfficerCard key={index} officer={officer} isExecutive={false} />
            ))}
        </div>
      </div>
    </div>
  )
}

function OfficerCard({ officer, isExecutive }: { officer: any; isExecutive: boolean }) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
      <div className="relative aspect-[3/4] overflow-hidden">
        {officer.imageUrl ? (
          <Image
            src={officer.imageUrl || "/placeholder.svg"}
            alt={`${officer.name} - ${officer.position}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400 text-lg">No image available</span>
          </div>
        )}
      </div>
      <CardHeader className="space-y-2">
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold text-navy">{officer.name}</CardTitle>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={isExecutive ? "default" : "secondary"}
              className={isExecutive ? "bg-teal text-white" : "bg-gray-100"}
            >
              {officer.position}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-2">
        <p className="text-gray-600">{officer.major}</p>
        {officer.email && (
          <Link
            href={`mailto:${officer.email}`}
            className="flex items-center gap-2 text-gray-600 hover:text-teal transition-colors group"
          >
            <Mail className="h-4 w-4 transition-colors group-hover:text-teal" />
            <span className="text-sm break-all">{officer.email}</span>
          </Link>
        )}
      </CardContent>
    </Card>
  )
}


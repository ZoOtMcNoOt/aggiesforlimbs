import { getData } from "@/lib/cms"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Heart } from "lucide-react"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AngelProfile({ params }: { params: { id: string } }) {
  let data
  try {
    data = getData()
  } catch (error) {
    console.error("Error fetching data:", error)
    return <div className="container mx-auto px-4 py-8">Error loading angel profile.</div>
  }

  const angels = data?.pages?.ourAngels?.angels || []
  const angel = angels.find((a) => a.id === params.id)

  if (!angel) {
    notFound()
  }

  const getAngelImage = (id: string) => {
    const images = {
      marquell:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/marquell.jpg-zPo8uChqkO1AkGqzywqlXwA4KPUaWI.jpeg",
      santos: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/santos.jpg-Jlh9ZAOhnjR5Dd3axBDplOWjFEJHsQ.jpeg",
      peggy: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Peggy.jpg-vIKo9LXB41SC4VQUhVDevgbOp73fQG.jpeg",
      reuben: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ruben.jpg-ebNl7xtkj0JAtSlTvVbfjyZjBNWbAL.jpeg",
      jorge:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jorge%201.jpg-K9marIYKzhAKyizG27h1GBT7Gv1RfX.jpeg",
      roman:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Meet%20Roman!%200-18%20screenshot-Y52gdoxYuaZ4kMnrAtXlkfvTwDxUEJ.png",
      cleto:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aggiesforlimbs_wixsite_com_home_cleto_img_1_walking.jpg-ngfAFChhDg55RjD8FNDF6QtEU5Si1f.jpeg",
    }
    return images[id] || "/placeholder.svg"
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/our-angels">
        <Button variant="ghost" className="mb-6">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Angels
        </Button>
      </Link>

      <Card className="overflow-hidden">
        <div className="md:flex flex-col md:flex-row">
          <div className="md:w-1/2 md:sticky md:top-0 md:self-start">
            <div className="relative w-full" style={{ paddingBottom: "100%" }}>
              <Image
                src={getAngelImage(angel.id) || "/placeholder.svg"}
                alt={`Portrait of ${angel.name}`}
                layout="fill"
                objectFit="contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
          <div className="md:w-1/2 p-6">
            <CardHeader>
              <CardTitle className="text-3xl font-bold mb-4 text-navy">{angel.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">{angel.story}</p>
              {angel.details && (
                <div className="bg-gray-light rounded-lg p-4 mb-6">
                  <h2 className="text-xl font-bold text-navy mb-2">Details</h2>
                  {Object.entries(angel.details).map(([key, value]) => (
                    <p key={key} className="text-gray-600">
                      <span className="font-semibold">{key}:</span> {value}
                    </p>
                  ))}
                </div>
              )}
              <Link href="/contribute">
                <Button className="w-full bg-teal hover:bg-teal/90 text-white">
                  Help Support More Angels
                  <Heart className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  )
}


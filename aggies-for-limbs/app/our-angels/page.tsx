import { getData } from "@/lib/cms"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function OurAngels() {
  let data
  try {
    data = getData()
  } catch (error) {
    console.error("Error fetching data:", error)
    return <div className="container mx-auto px-4 py-8">Error loading angels data.</div>
  }

  const angels = data?.pages?.ourAngels?.angels || []

  const getAngelImage = (id: string) => {
    const images = {
      reuben: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ruben.jpg-ebNl7xtkj0JAtSlTvVbfjyZjBNWbAL.jpeg",
      santos: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/santos.jpg-Jlh9ZAOhnjR5Dd3axBDplOWjFEJHsQ.jpeg",
      marquell:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/marquell.jpg-zPo8uChqkO1AkGqzywqlXwA4KPUaWI.jpeg",
      peggy: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Peggy.jpg-vIKo9LXB41SC4VQUhVDevgbOp73fQG.jpeg",
      jorge:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jorge%201.jpg-K9marIYKzhAKyizG27h1GBT7Gv1RfX.jpeg",
      roman:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Meet%20Roman!%200-18%20screenshot-Y52gdoxYuaZ4kMnrAtXlkfvTwDxUEJ.png",
      cleto:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aggiesforlimbs_wixsite_com_home_cleto_img_1_walking.jpg-ngfAFChhDg55RjD8FNDF6QtEU5Si1f.jpeg",
    }
    return images[id] || `/placeholder.svg?height=400&width=300`
  }

  if (!Array.isArray(angels)) {
    return <div className="container mx-auto px-4 py-8">No angels data available.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-navy">Our Angels</h1>
      {angels.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {angels.map((angel) => (
            <div key={angel.id} className="bg-white rounded-lg shadow-lg overflow-hidden group">
              <div className="aspect-[3/4] relative overflow-hidden">
                <Image
                  src={getAngelImage(angel.id) || "/placeholder.svg"}
                  alt={`Portrait of ${angel.name}`}
                  fill
                  className="object-cover w-full h-full transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 text-navy">{angel.name}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{angel.story}</p>
                <Link href={`/our-angels/${angel.id}`}>
                  <Button className="w-full bg-teal hover:bg-teal/90 text-white">
                    Read Story
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xl text-gray-600">No angels found at the moment. Please check back later.</p>
      )}
    </div>
  )
}


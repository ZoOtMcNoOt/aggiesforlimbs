import { getData, getEvents } from "@/lib/cms"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Users, Calendar } from "lucide-react"

export default function Home() {
  const { siteInfo, events } = getData()
  const { upcomingEvents } = getEvents()

  return (
    <>
      <section className="hero-gradient min-h-screen flex items-center pt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6 animate-fade-in">
              <h1 className="text-5xl font-bold leading-tight">Help someone take their second first steps</h1>
              <p className="text-xl opacity-90">{siteInfo.mission || "Help us make a difference in people's lives."}</p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/contribute#top">
                  <Button className="w-full sm:w-auto bg-teal hover:bg-teal/90 text-white px-8 py-3 sm:px-10 sm:py-4 text-base sm:text-lg">
                    Donate Now
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </Link>
                <Link href="/recruitment#top">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto bg-white/10 border-white text-white hover:bg-white hover:text-navy px-8 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-medium border-2 transition-colors duration-300"
                  >
                    Join Us
                    <Users className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aggiesforlimbs_wixsite_com_home_img_4_group.jpg-CLj73henPysPMwb8eOYGf9nEbVBwfQ.jpeg"
                alt="Large group of Aggies for Limbs members at a covered outdoor venue, showing enthusiasm with thumbs up gestures in front of an organization banner"
                width={1200}
                height={800}
                className="rounded-lg shadow-2xl animate-fade-in object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section id="impact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {siteInfo.impact?.description || "We're making a significant impact in our community."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-light p-8 rounded-xl text-center card-hover">
              <div className="bg-teal w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-white w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-navy mb-2">${siteInfo.impact?.fundingPerSemester || "5,000+"}</h3>
              <p className="text-gray-600">Raised Every Semester</p>
            </div>

            <div className="bg-gray-light p-8 rounded-xl text-center card-hover">
              <div className="bg-navy w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-white w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-navy mb-2">{siteInfo.impact?.prostheticLegsProvided || 9}</h3>
              <p className="text-gray-600">Prosthetic Legs Provided</p>
            </div>

            <div className="bg-gray-light p-8 rounded-xl text-center card-hover">
              <div className="bg-teal w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-white w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-navy mb-2">{siteInfo.impact?.livesChanged || 9}</h3>
              <p className="text-gray-600">Lives Changed</p>
            </div>
          </div>
        </div>
      </section>

      <section id="stories" className="py-20 bg-navy text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/marquell_prosthetics_aggiesforlimbs_wixsite_com_home_marquell_aggiesforlimbs_wixsite_com_home_marquell_79894e_9cea5f1f3a7f4d6ba205a649a54d8e44_mv2.jpg-EMOceetTDZkHFkW8apyAfHWyjuOjMl.jpeg"
                alt="Marquell with Aggies for Limbs members at the clinic"
                width={500}
                height={500}
                className="rounded-lg shadow-2xl object-cover"
              />
            </div>
            <div className="space-y-6 p-6 md:p-8 lg:p-10">
              <h2 className="text-4xl font-bold leading-tight">Real Stories, Real Impact</h2>
              <p className="text-xl leading-relaxed">
                {siteInfo.angels && siteInfo.angels[0]
                  ? siteInfo.angels[0].story
                  : "Discover inspiring stories of resilience and hope."}
              </p>
              <div>
                <Link href="/our-angels#top">
                  <Button className="bg-teal hover:bg-teal/90 text-white px-8 py-4 text-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                    Meet Our Angels
                    <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="community" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-4">Our Community</h2>
            <p className="text-xl text-gray-600">Making a difference together</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="rounded-xl overflow-hidden shadow-lg md:col-span-1">
              <div className="relative w-full h-full" style={{ minHeight: "300px" }}>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aggies_limbs_aggiesforlimbs_wixsite_com_home_aggiesforlimbs_wixsite_com_home_79894e_71aaab8aaf7842fba7301bd1b1d599c8_mv2.jpg-M3WhgGetwq4Bg0vRfyrPLFStGx3yFw.jpeg"
                  alt="Aggies for Limbs members with recipient"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg md:col-span-2">
              <div className="relative h-full" style={{ minHeight: "300px" }}>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aggies_limbs_aggiesforlimbs_wixsite_com_home_aggiesforlimbs_wixsite_com_home_14963207_341613939546967_319407479450581_79894e_11941a94dd1c42848a02ca083d70192b_mv2.jpg-Wi3mDfDCj2Z2RYgU79yjWQz9zrPjGw.jpeg"
                  alt="Aggies for Limbs service event"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg md:col-span-1">
              <div className="relative w-full h-full" style={{ minHeight: "300px" }}>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aggiesforlimbs_wixsite_com_home_img_3_wheelchair.jpg-mWVfip2j4E27UuH9gfSHpqOyGP0Aql.jpeg"
                  alt="An Aggies for Limbs member sharing a warm moment with a person in a wheelchair, both smiling brightly in an indoor setting"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="events" className="py-20 bg-gray-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-4">Upcoming Events</h2>
            <p className="text-xl text-gray-600">Join us in making a difference</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.slice(0, 3).map((event) => (
              <div key={event.id} className="bg-white rounded-xl p-6 card-hover">
                <div className="flex items-center space-x-4 mb-4">
                  <Calendar className="text-teal w-6 h-6" />
                  <span className="text-navy font-semibold">{event.title}</span>
                </div>
                <p className="text-gray-600 mb-2">{new Date(event.date).toLocaleDateString()}</p>
                <p className="text-gray-600 mb-4">{event.description.slice(0, 100)}...</p>
                <Link href={`/events/${event.id}`}>
                  <Button className="w-full bg-navy hover:bg-navy/90 text-white">Learn More</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}


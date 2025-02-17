import { getData } from "@/lib/cms"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Calendar, Users, ChevronRight } from "lucide-react"
import { ApplicationForm } from "@/components/ApplicationForm"

export default function RecruitmentPage() {
  const data = getData()
  const members = data?.pages?.members

  if (!members || !members.recruitment) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-navy">Recruitment Information</h1>
        <p className="text-xl text-gray-600">
          Recruitment information is currently unavailable. Please check back later or contact us for more details.
        </p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div id="top" />
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-navy">Join Aggies for Limbs</h1>
      <div className="max-w-4xl mx-auto space-y-8 w-full">
        {/* Why Join AFL? */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-navy">Why Join AFL?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Joining Aggies for Limbs offers you the opportunity to make a real difference in people's lives. As a
              member, you'll participate in fundraising events, community service, and social activities while working
              towards our mission of providing prosthetics to those in need.
            </p>
            <Link href="/our-angels#top">
              <Button variant="outline" className="flex items-center space-x-2">
                <span>See Our Impact</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recruitment Events */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-navy">Spring 2025 Recruitment Events</CardTitle>
            <CardDescription>Join us for these upcoming events</CardDescription>
          </CardHeader>
          <CardContent>
            {members.recruitment.events && members.recruitment.events.length > 0 ? (
              <ul className="space-y-4">
                {members.recruitment.events.map((event, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-teal mt-0.5" />
                    <div>
                      <p className="font-semibold">{event.name}</p>
                      <p className="text-sm text-gray-600">
                        {event.date} {event.time && `| ${event.time}`}
                      </p>
                      {event.location && <p className="text-sm text-gray-600">{event.location}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">
                No upcoming recruitment events at this time. Please check back later for updates.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Application Form */}
        <ApplicationForm />

        {/* What to Expect */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-navy">What to Expect as a Member</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              As an AFL member, you'll be assigned to one of our committees each semester. Each committee plays a
              crucial role in our organization's success, from event planning to fundraising and community outreach.
            </p>
            <Link href="/committees#top">
              <Button className="bg-teal hover:bg-teal/90 text-white">
                Explore Committees
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-navy flex items-center space-x-2">
              <Users className="h-6 w-6 text-teal" />
              <span>Frequently Asked Questions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {members.faq && members.faq.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {members.faq.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <p className="text-gray-600">No FAQ information available at this time.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


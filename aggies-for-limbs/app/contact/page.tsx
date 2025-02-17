import { getData } from "@/lib/cms"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Facebook, Instagram } from "lucide-react"
import { ContactForm } from "@/components/ContactForm"

// Removed the NewTwitterIcon component

const combineCoRoles = (officers) => {
  const combinedOfficers = []
  const emailMap = {}

  officers.forEach((officer) => {
    if (emailMap[officer.email]) {
      emailMap[officer.email].names.push(officer.name)
      emailMap[officer.email].position = emailMap[officer.email].position.replace("Co-", "")
    } else {
      emailMap[officer.email] = { ...officer, names: [officer.name] }
    }
  })

  Object.values(emailMap).forEach((role) => {
    combinedOfficers.push({
      ...role,
      name: role.names.join(" & "),
    })
  })

  return combinedOfficers
}

export default function Contact() {
  const data = getData()
  const officers = combineCoRoles(data?.officers || [])
  const socialMedia = data?.socialMedia || {}

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-navy mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-navy">Officer Contacts</CardTitle>
              <CardDescription>Reach out to our officers directly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {officers.map((officer, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="mt-1">
                    <Mail className="h-5 w-5 text-teal" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy">{officer.position}</h3>
                    <p className="text-gray-600">{officer.name}</p>
                    <a href={`mailto:${officer.email}`} className="text-teal hover:text-navy transition-colors">
                      {officer.email}
                    </a>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-navy">Connect With Us</CardTitle>
              <CardDescription>Follow us on social media for updates and news</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                {socialMedia.facebook && (
                  <a href={socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button
                      variant="outline"
                      className="w-full justify-start space-x-2 hover:bg-navy hover:text-white transition-colors"
                    >
                      <Facebook className="h-5 w-5" />
                      <span>Follow us on Facebook</span>
                    </Button>
                  </a>
                )}
                {socialMedia.instagram && (
                  <a href={socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button
                      variant="outline"
                      className="w-full justify-start space-x-2 hover:bg-teal hover:text-white transition-colors"
                    >
                      <Instagram className="h-5 w-5" />
                      <span>Follow us on Instagram</span>
                    </Button>
                  </a>
                )}
                {socialMedia.twitter && (
                  <a href={socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button
                      variant="outline"
                      className="w-full justify-start space-x-2 hover:bg-navy hover:text-white transition-colors"
                    >
                      <i className="bi bi-twitter-x h-5 w-5"></i>
                      <span>Follow us on Twitter</span>
                    </Button>
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-navy">Send a Message</CardTitle>
            <CardDescription>Fill out the form below and we'll get back to you</CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


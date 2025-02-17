import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function MemberApplication() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Apply to Join Aggies for Limbs</h1>
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <form>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Your full name" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Your email" />
            </div>
            <div>
              <Label htmlFor="major">Major</Label>
              <Input id="major" placeholder="Your major" />
            </div>
            <div>
              <Label htmlFor="year">Year</Label>
              <Input id="year" placeholder="Freshman, Sophomore, Junior, Senior, etc." />
            </div>
            <div>
              <Label htmlFor="why-join">Why do you want to join Aggies for Limbs?</Label>
              <Textarea id="why-join" placeholder="Your answer" rows={4} />
            </div>
            <div>
              <Label htmlFor="experience">Relevant experience or skills</Label>
              <Textarea id="experience" placeholder="Your answer" rows={4} />
            </div>
            <Button type="submit" className="w-full">
              Submit Application
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}


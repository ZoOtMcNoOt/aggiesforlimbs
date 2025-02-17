"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  photo: z.instanceof(File).optional(),
  isCurrentStudent: z.enum(["yes", "no"], {
    required_error: "Please select if you are a current student.",
  }),
  classification: z.string({
    required_error: "Please select your classification.",
  }),
  graduationDate: z.string().min(1, { message: "Please enter your expected graduation date." }),
  gpaAbove2: z.enum(["yes", "no"], {
    required_error: "Please indicate if your GPA is above 2.00.",
  }),
  whyJoin: z.string().min(10, { message: "Please provide a more detailed answer." }),
  howBenefit: z.string().min(10, { message: "Please provide a more detailed answer." }),
  howHeard: z.string().min(2, { message: "Please let us know how you heard about us." }),
})

export function ApplicationForm() {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data) => {
    // Here you would typically send the data to your server
    // For this example, we'll just log it and show a success message
    console.log(data)
    toast({
      title: "Application Submitted",
      description: "Your application has been successfully submitted. Check your email for further instructions.",
    })
  }

  const handlePhotoChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-navy">Aggies for Limbs Spring 2025 Application</CardTitle>
        <CardDescription>
          Please fill out this application form. Once completed, email it as a PDF to aggies4limbs.president@gmail.com
          and aggies4limbs.vp@gmail.com.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="photo">Photo</Label>
              <Input id="photo" type="file" accept="image/*" onChange={handlePhotoChange} />
              {photoPreview && (
                <div className="mt-2">
                  <img
                    src={photoPreview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full max-w-[128px] h-auto object-cover rounded-md"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Are you a current Texas A&M University- College Station student?</Label>
            <RadioGroup defaultValue="no">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="current-student-yes" {...register("isCurrentStudent")} />
                <Label htmlFor="current-student-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="current-student-no" {...register("isCurrentStudent")} />
                <Label htmlFor="current-student-no">No</Label>
              </div>
            </RadioGroup>
            {errors.isCurrentStudent && <p className="text-red-500 text-sm">{errors.isCurrentStudent.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="classification">Classification</Label>
            <Select onValueChange={(value) => register("classification").onChange({ target: { value } })}>
              <SelectTrigger>
                <SelectValue placeholder="Select your classification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="freshman">Freshman</SelectItem>
                <SelectItem value="sophomore">Sophomore</SelectItem>
                <SelectItem value="junior">Junior</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
                <SelectItem value="graduate">Graduate Student</SelectItem>
              </SelectContent>
            </Select>
            {errors.classification && <p className="text-red-500 text-sm">{errors.classification.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="graduationDate">Expected graduation date</Label>
            <Input id="graduationDate" type="month" {...register("graduationDate")} />
            {errors.graduationDate && <p className="text-red-500 text-sm">{errors.graduationDate.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Is your GPA higher than 2.00?</Label>
            <RadioGroup defaultValue="no">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="gpa-yes" {...register("gpaAbove2")} />
                <Label htmlFor="gpa-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="gpa-no" {...register("gpaAbove2")} />
                <Label htmlFor="gpa-no">No</Label>
              </div>
            </RadioGroup>
            {errors.gpaAbove2 && <p className="text-red-500 text-sm">{errors.gpaAbove2.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="whyJoin">Why do you want to be a part of Aggies for Limbs?</Label>
            <Textarea id="whyJoin" {...register("whyJoin")} />
            {errors.whyJoin && <p className="text-red-500 text-sm">{errors.whyJoin.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="howBenefit">How would you benefit the organization?</Label>
            <Textarea id="howBenefit" {...register("howBenefit")} />
            {errors.howBenefit && <p className="text-red-500 text-sm">{errors.howBenefit.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="howHeard">How did you hear about Aggies for Limbs?</Label>
            <Input id="howHeard" {...register("howHeard")} />
            {errors.howHeard && <p className="text-red-500 text-sm">{errors.howHeard.message}</p>}
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full bg-navy hover:bg-navy/90 text-white">
          Submit Application
        </Button>
      </CardFooter>
    </Card>
  )
}


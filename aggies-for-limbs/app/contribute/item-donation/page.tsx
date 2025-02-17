"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  donorName: z.string().min(2, { message: "Donor name is required" }),
  companyName: z.string().optional(),
  contactName: z.string().min(2, { message: "Contact name is required" }),
  mailingAddress: z.string().min(5, { message: "Mailing address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  zip: z.string().min(5, { message: "ZIP code is required" }),
  phoneNumber: z.string().min(10, { message: "Phone number is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  itemDescription: z.string().min(10, { message: "Please provide a description of the items you're donating" }),
})

export default function ItemDonationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    // Here you would typically send the data to your server
    // For this example, we'll just simulate a submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    toast({
      title: "Form submitted",
      description: "Thank you for your item donation!",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-navy">Item Donation Form</CardTitle>
          <CardDescription>Donate items to support Aggies for Limbs events</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="donorName">Donor Name</Label>
              <Input id="donorName" {...register("donorName")} />
              {errors.donorName && <p className="text-red-500 text-sm">{errors.donorName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name (if applicable)</Label>
              <Input id="companyName" {...register("companyName")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactName">Contact Name</Label>
              <Input id="contactName" {...register("contactName")} />
              {errors.contactName && <p className="text-red-500 text-sm">{errors.contactName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="mailingAddress">Mailing Address</Label>
              <Input id="mailingAddress" {...register("mailingAddress")} />
              {errors.mailingAddress && <p className="text-red-500 text-sm">{errors.mailingAddress.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" {...register("city")} />
                {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" {...register("state")} />
                {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP Code</Label>
              <Input id="zip" {...register("zip")} />
              {errors.zip && <p className="text-red-500 text-sm">{errors.zip.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input id="phoneNumber" {...register("phoneNumber")} />
              {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="itemDescription">Item Description</Label>
              <Textarea id="itemDescription" {...register("itemDescription")} />
              {errors.itemDescription && <p className="text-red-500 text-sm">{errors.itemDescription.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Item Donation"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


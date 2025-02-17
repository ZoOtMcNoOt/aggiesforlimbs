"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  donorName: z.string().min(2, { message: "Donor name is required" }),
  amount: z.string().min(1, { message: "Amount is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string().min(10, { message: "Phone number is required" }),
  event: z.string().min(1, { message: "Please select an event" }),
  message: z.string().optional(),
})

export default function EventDonationForm() {
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
      title: "Event Donation Submitted",
      description: "Thank you for supporting our event!",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-navy">Event Donation Form</CardTitle>
          <CardDescription>Support an Aggies for Limbs event with your donation</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="donorName">Donor Name</Label>
              <Input id="donorName" {...register("donorName")} />
              {errors.donorName && <p className="text-red-500 text-sm">{errors.donorName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Donation Amount ($)</Label>
              <Input id="amount" type="number" {...register("amount")} />
              {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input id="phoneNumber" {...register("phoneNumber")} />
              {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="event">Select Event</Label>
              <Select onValueChange={(value) => register("event").onChange({ target: { value } })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an event" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2nd-annual-bingo-bash">2nd Annual Bingo Bash</SelectItem>
                  <SelectItem value="santas-stroll-2024">Santa's Stroll 2024</SelectItem>
                  <SelectItem value="general-event-fund">General Event Fund</SelectItem>
                </SelectContent>
              </Select>
              {errors.event && <p className="text-red-500 text-sm">{errors.event.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message (Optional)</Label>
              <Input id="message" {...register("message")} />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Submit Event Donation"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


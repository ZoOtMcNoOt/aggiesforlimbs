import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()

  // Log the form submission
  console.log("Form submitted:", body)

  // Here you would typically process the form data
  // For example, you could save it to a database or send it to another service

  // For now, we'll just return a success message
  return NextResponse.json({ message: "Form submission received" }, { status: 200 })
}


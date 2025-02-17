import { NextResponse } from "next/server"
import { getEvents } from "@/lib/cms"

export async function GET() {
  const { allEvents } = getEvents()
  return NextResponse.json(allEvents)
}


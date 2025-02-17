import fs from "fs"
import path from "path"
import { ENV } from "./constants"

const dataDir = path.join(process.cwd(), "data")

function readJsonFile(fileName: string) {
  const filePath = path.join(dataDir, fileName)
  try {
    const jsonData = fs.readFileSync(filePath, "utf8")
    return JSON.parse(jsonData)
  } catch (error) {
    console.error(`Error reading ${fileName}:`, error)
    return null
  }
}

export function getData() {
  console.log("Loading data with site URL:", ENV.SITE_URL)
  return {
    siteInfo: readJsonFile("siteInfo.json"),
    navigation: readJsonFile("navigation.json"),
    pages: {
      home: readJsonFile("home.json"),
      ourAngels: readJsonFile("ourAngels.json"),
      members: readJsonFile("members.json"),
    },
    officers: readJsonFile("officers.json"),
    socialMedia: readJsonFile("socialMedia.json"),
    events: getEvents(),
    committees: readJsonFile("committees.json"),
  }
}

export function getEvents() {
  const years = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]
  let allEvents = []

  for (const year of years) {
    const fileName = `events-${year}.json`
    const yearEvents = readJsonFile(fileName)
    if (yearEvents && yearEvents.events) {
      allEvents = [...allEvents, ...yearEvents.events]
    }
  }

  if (allEvents.length === 0) {
    console.warn("No events data found")
    return { upcomingEvents: [], pastEvents: [], allEvents: [] }
  }

  const now = new Date()

  allEvents = allEvents
    .map((event) => ({
      ...event,
      date: event.date || (event.endDate ? event.endDate : now.toISOString()),
      location: event.location || { name: "TBA", address: "", city: "", state: "", zip: "" },
      description: event.description || "More details coming soon!",
      imageUrl: event.imageUrl || "/placeholder.svg",
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const upcomingEvents = allEvents.filter((event) => new Date(event.date) >= now)
  const pastEvents = allEvents.filter((event) => new Date(event.date) < now)

  return { upcomingEvents, pastEvents, allEvents }
}

export function getEventById(id: string) {
  const { allEvents } = getEvents()
  return allEvents.find((event) => event.id === id)
}

export function officerContacts() {
  const allOfficers = readJsonFile("officers.json")
  const contactRoles = ["President", "Vice President", "Treasurer", "Internal Operations", "Event Planning"]

  return allOfficers.filter((officer) => contactRoles.includes(officer.position))
}


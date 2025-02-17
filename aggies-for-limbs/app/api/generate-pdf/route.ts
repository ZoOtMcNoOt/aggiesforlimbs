import { type NextRequest, NextResponse } from "next/server"
import { generateDonationPDF } from "@/lib/pdf-generator"

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const pdfBuffer = await generateDonationPDF(data)

    // Return the PDF as a downloadable file
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="donation-form.pdf"',
      },
    })
  } catch (error) {
    console.error("Error generating PDF:", error)
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 })
  }
}


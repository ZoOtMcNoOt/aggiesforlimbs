interface DonationFormData {
  amount: number
  sponsorName: string
  contactName: string
  address: string
  city: string
  state: string
  zip: string
  phone: string
  email: string
  aflRepresentative: string
  date: string
}

export async function generateDonationPDF(data: DonationFormData): Promise<Buffer> {
  // Create the PDF content
  const pdfContent = `
%PDF-1.7
1 0 obj
<< /Type /Catalog
   /Pages 2 0 R
>>
endobj

2 0 obj
<< /Type /Pages
   /Kids [3 0 R]
   /Count 1
>>
endobj

3 0 obj
<< /Type /Page
   /Parent 2 0 R
   /Resources << /Font << /F1 4 0 R >> >>
   /MediaBox [0 0 612 792]
   /Contents 5 0 R
>>
endobj

4 0 obj
<< /Type /Font
   /Subtype /Type1
   /BaseFont /Helvetica
>>
endobj

5 0 obj
<< /Length 1000 >>
stream
BT
/F1 12 Tf
50 700 Td
(Aggies for Limbs Sponsor Contract) Tj
0 -40 Td
(Monetary Donations) Tj
0 -20 Td
(${data.sponsorName}, here in after referred to as sponsor, hereby agree(s) to donate) Tj
0 -20 Td
($${data.amount} for a contribution for the Aggies for Limbs, benefiting Ashton's Angels.) Tj
0 -40 Td
(Sponsor/Company Name: ${data.sponsorName}) Tj
0 -20 Td
(Sponsor Representative/Contact: ${data.contactName}) Tj
0 -20 Td
(Mailing Address: ${data.address}) Tj
0 -20 Td
(City: ${data.city}     State: ${data.state}     Zip: ${data.zip}) Tj
0 -20 Td
(Phone Number: ${data.phone}) Tj
0 -20 Td
(Email: ${data.email}) Tj
0 -20 Td
(AFL Representative: ${data.aflRepresentative}) Tj
0 -20 Td
(Date: ${data.date}) Tj
0 -40 Td
(Please make checks payable to Aggies for Limbs and send to:) Tj
0 -20 Td
(12374 Tramonto Drive) Tj
0 -20 Td
(Conroe, TX 77304) Tj
ET
endstream
endobj

xref
0 6
0000000000 65535 f
0000000010 00000 n
0000000060 00000 n
0000000120 00000 n
0000000250 00000 n
0000000330 00000 n

trailer
<< /Size 6
   /Root 1 0 R
>>
startxref
1400
%%EOF
`

  // Convert the PDF content to a Buffer
  return Buffer.from(pdfContent)
}


import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const TO_EMAIL = process.env.CONTACT_EMAIL ?? 'alexandre@impulsolead.com'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { name?: string; email?: string; message?: string }
    const { name, email, message } = body

    if (
      !name || !email || !message ||
      typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string' ||
      name.length > 200 || email.length > 200 || message.length > 500
    ) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured')
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: TO_EMAIL,
      subject: `Portfolio enquiry from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      replyTo: email,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

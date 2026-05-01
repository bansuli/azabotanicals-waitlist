import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const OWNER_EMAIL = process.env.OWNER_EMAIL || 'bansuleimann@gmail.com'
const GMAIL_USER  = process.env.GMAIL_USER
const GMAIL_PASS  = process.env.GMAIL_APP_PASSWORD

function createTransport() {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user: GMAIL_USER, pass: GMAIL_PASS },
  })
}

export async function POST(req: NextRequest) {
  let email: string
  try {
    const body = await req.json()
    email = (body?.email || '').trim().toLowerCase()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
  }

  try {
    const mail = createTransport()

    // Notify owner
    await mail.sendMail({
      from: `aża botanicals <${GMAIL_USER}>`,
      to: OWNER_EMAIL,
      subject: `New waitlist signup — ${email}`,
      html: `
        <div style="font-family:monospace;padding:32px;color:#1a1a17;background:#F2EDE4;max-width:480px">
          <p style="font-size:10px;letter-spacing:0.15em;opacity:0.45;margin-bottom:20px">AŻA BOTANICALS · WAITLIST</p>
          <p style="font-size:15px;font-weight:700;margin-bottom:8px">New signup</p>
          <p style="font-size:14px">${email}</p>
        </div>`,
    })

    // Confirmation to subscriber
    await mail.sendMail({
      from: `aża botanicals <${GMAIL_USER}>`,
      to: email,
      subject: "you're on the waitlist.",
      html: `
        <div style="font-family:monospace;background:#F5F6F5;padding:48px 40px;max-width:480px;color:#1a1a17">
          <div style="font-size:22px;font-weight:700;letter-spacing:0.08em;margin-bottom:6px">aża</div>
          <div style="font-size:9px;letter-spacing:0.25em;opacity:0.4;padding-bottom:20px;margin-bottom:28px;border-bottom:1px solid rgba(26,26,23,0.12)">
            BOTANICALS
          </div>
          <div style="font-size:17px;font-weight:700;letter-spacing:0.12em;text-transform:lowercase;margin-bottom:20px">
            you're on the waitlist.
          </div>
          <p style="font-size:11px;letter-spacing:0.05em;line-height:1.95;opacity:0.62;margin-bottom:32px">
            something is growing.<br>
            we'll be in touch soon.
          </p>
          <div style="font-size:8px;letter-spacing:0.22em;opacity:0.3;border-top:1px solid rgba(26,26,23,0.1);padding-top:20px">
            aża botanicals
          </div>
        </div>`,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[subscribe]', err)
    return NextResponse.json({ error: 'Failed to send — please try again.' }, { status: 500 })
  }
}

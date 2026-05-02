import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

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
    await resend.emails.send({
      from: 'aża botanicals <hello@azabotanicals.com>',
      to: email,
      subject: "you're on the waitlist.",
      html: `
        <div style="font-family:monospace;background:#F5F6F5;padding:48px 40px;max-width:480px;color:#1a1a17">
          <div style="font-size:22px;font-weight:700;letter-spacing:0.08em;margin-bottom:6px">aża</div>
          <div style="font-size:9px;letter-spacing:0.25em;opacity:0.4;padding-bottom:20px;margin-bottom:28px;border-bottom:1px solid rgba(26,26,23,0.12)">
            BOTANICALS
          </div>
          <div style="font-size:17px;font-weight:700;letter-spacing:0.12em;margin-bottom:20px">
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

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
        <div style="font-family:monospace;background:#ffffff;padding:48px 40px;max-width:480px;color:#1a1a17">
          <div style="margin-bottom:32px;padding-bottom:20px;border-bottom:1px solid rgba(26,26,23,0.12)">
            <img src="https://azabotanicals.com/aza-logo.png" alt="aża botanicals" style="width:120px;display:block;" />
          </div>
          <div style="font-size:17px;font-weight:700;letter-spacing:0.12em;margin-bottom:20px">
            you're on the waitlist.
          </div>
          <p style="font-size:11px;letter-spacing:0.05em;line-height:1.95;opacity:0.62;margin-bottom:32px">
            something is growing.<br>
            we'll be in touch soon.
          </p>
        </div>`,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[subscribe]', err)
    return NextResponse.json({ error: 'Failed to send — please try again.' }, { status: 500 })
  }
}

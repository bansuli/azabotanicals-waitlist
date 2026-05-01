'use client'
import { useState } from 'react'

// ← paste your Google Form values here
const FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSfSj4kQL-QCokF0hJfdXmrB0_xVOi6icGmr4oeA-M_WbIR0Rg/formResponse'
const ENTRY_ID = 'entry.696096006'

export default function Home() {
  const [showForm, setShowForm] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    const body = new FormData()
    body.append(ENTRY_ID, email)
    await fetch(FORM_ACTION, { method: 'POST', body, mode: 'no-cors' })
    setSubmitted(true)
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center" style={{ position: 'relative', background: '#FDFBF8' }}>
      {/* GIF background */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/eyes.gif" alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />

      {!showForm ? (
        <>
          {/* Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/aza-logo.png" alt="AZA Botanicals" style={{ width: 280, position: 'absolute', zIndex: 1 }} />
          {/* Button */}
          <div style={{ position: 'absolute', top: 'calc(50% - 100px)', left: 'calc(50% + 40px)', transform: 'translateX(-50%)', zIndex: 1 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/waitlist-button.png"
              alt="Join Waitlist"
              className="btn-pulse"
              onClick={() => setShowForm(true)}
              style={{ width: 600, cursor: 'pointer', display: 'block' }}
            />
          </div>
        </>
      ) : submitted ? (
        <p style={{ position: 'relative', zIndex: 1, fontFamily: 'Georgia, serif', fontSize: 18, color: '#3a3a3a', letterSpacing: '0.05em' }}>
          you&apos;re on the list.
        </p>
      ) : (
        <form onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 80 }}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoFocus
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: '1px solid #3a3a3a',
              outline: 'none',
              fontFamily: '"Courier New", Courier, monospace',
              fontSize: 18,
              color: '#3a3a3a',
              textAlign: 'center',
              width: 260,
              padding: '4px 0',
              letterSpacing: '0.05em',
            }}
          />
        </form>
      )}
    </div>
  )
}

'use client'
import { useState } from 'react'

// ← paste your Google Form values here
const FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSfSj4kQL-QCokF0hJfdXmrB0_xVOi6icGmr4oeA-M_WbIR0Rg/formResponse'
const ENTRY_ID = 'entry.696096006'

export default function Home() {
  const [showForm, setShowForm] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const commonFakeDomains = ['test.com', 'example.com', 'fake.com', 'asdf.com', 'qwerty.com', 'abc.com', 'foo.com', 'bar.com']
  const validTLDs = ['com', 'net', 'org', 'edu', 'gov', 'io', 'co', 'uk', 'ca', 'au', 'de', 'fr', 'me', 'app', 'dev', 'ai', 'info', 'biz', 'us', 'ng', 'za', 'gh']

  function isValidEmail(val: string) {
    if (!val) return false
    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(val)) return false
    const parts = val.split('@')
    if (parts.length !== 2) return false
    const domain = parts[1].toLowerCase()
    if (commonFakeDomains.includes(domain)) return false
    const tld = domain.split('.').pop() || ''
    if (!validTLDs.includes(tld)) return false
    // domain part before TLD should be at least 2 chars
    const domainParts = domain.split('.')
    if (domainParts[0].length < 2) return false
    return true
  }

  const emailValid = isValidEmail(email)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    // Also log to Google Sheets
    const formData = new FormData()
    formData.append(ENTRY_ID, email)
    fetch(FORM_ACTION, { method: 'POST', body: formData, mode: 'no-cors' })
    // Send confirmation email
    await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    setSubmitted(true)
  }

  return (
    <div className="w-screen flex items-center justify-center" style={{ minHeight: '100dvh', position: 'relative', background: '#F5F6F5' }}>
      {/* GIF background */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/eyes.gif" alt="" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />

      {!showForm ? (
        <div className="home-content">
          {/* Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/aza-logo.png" alt="AZA Botanicals" className="logo-img" />
          {/* Button */}
          <div className="btn-wrapper">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/waitlist-button.png"
              alt="Join Waitlist"
              className="btn-pulse"
              onClick={() => setShowForm(true)}
              style={{ width: 600, cursor: 'pointer', display: 'block' }}
            />
          </div>
        </div>
      ) : submitted ? (
        <p style={{ position: 'absolute', zIndex: 1, top: 'calc(50% + 30px)', fontFamily: '"Courier New", Courier, monospace', fontSize: 18, color: '#3a3a3a', letterSpacing: '0.05em', textAlign: 'center' }}>
          you&apos;re on the waitlist. we&apos;ll be in touch.
        </p>
      ) : (
        <form onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 80 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
            <span style={{
              fontFamily: '"Courier New", Courier, monospace',
              fontSize: 18,
              color: '#3a3a3a',
              opacity: emailValid ? 1 : 0,
              transition: 'opacity 0.2s ease',
            }}>✓</span>
          </div>
        </form>
      )}
    </div>
  )
}

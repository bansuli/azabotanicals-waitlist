'use client'

export default function Home() {
  return (
    <div className="w-screen h-screen flex items-center justify-center" style={{ position: 'relative', background: '#FDFBF8' }}>
      {/* GIF background */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/eyes.gif" alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
      {/* Logo — stays dead center */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/aza-logo.png" alt="AZA Botanicals" style={{ width: 280, position: 'absolute', zIndex: 1 }} />
      {/* Button — below logo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/waitlist-button.png" alt="Join Waitlist" style={{ width: 300, cursor: 'pointer', position: 'absolute', top: 'calc(50% + 30px)', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }} />
    </div>
  )
}

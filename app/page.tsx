'use client'
import { useEffect, useState } from 'react'

const TARGET_WIDTH = 260

const IMAGES = [
  { src: '/photos/fig1.png',  rotate: -1.8 },
  { src: '/photos/fig4.png',  rotate:  6.5 },
  { src: '/photos/fig18.png', rotate: -8.2 },
  { src: '/photos/fig12.png', rotate:  5.4 },
  { src: '/photos/fig11.png', rotate: -3.5 },
]

export default function Home() {
  const [current, setCurrent] = useState(0)
  const [done, setDone] = useState(false)
  const [showLogo, setShowLogo] = useState(false)
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null)

  useEffect(() => {
    const img = new window.Image()
    img.src = IMAGES[0].src
    img.onload = () => setDims({ w: img.naturalWidth, h: img.naturalHeight })
  }, [])

  useEffect(() => {
    if (!dims) return
    if (current >= IMAGES.length) {
      const t = setTimeout(() => { setDone(true); setTimeout(() => setShowLogo(true), 50) }, 600)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setCurrent(c => c + 1), 420)
    return () => clearTimeout(t)
  }, [dims, current])

  if (!dims) return null

  const totalW = TARGET_WIDTH
  const totalH = dims.h * (TARGET_WIDTH / dims.w)

  const splitBg = (
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: 'url(/photos/back1.png), url(/photos/back2.png)',
      backgroundSize: '50% 100%, 50% 100%',
      backgroundPosition: 'left center, right center',
      backgroundRepeat: 'no-repeat',
    }} />
  )

  if (done) {
    return (
      <div className="w-screen h-screen flex items-center justify-center" style={{ position: 'relative', background: '#FDFBF8', opacity: showLogo ? 1 : 0, transition: 'opacity 0.8s ease' }}>

        {/* GIF background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/eyes.gif" alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />

        {/* Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/aza-logo.png" alt="AZA Botanicals" style={{ width: 280, position: 'relative', zIndex: 1 }} />
      </div>
    )
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center" style={{ position: 'relative', background: '#FDFBF8' }}>
      <div style={{ position: 'relative', zIndex: 1, width: totalW, height: totalH }}>
        {IMAGES.map(({ src, rotate }, i) => (
          <div
            key={src}
            style={{
              position: 'absolute', top: 0, left: 0,
              width: totalW, height: totalH,
              backgroundImage: `url(${src})`,
              backgroundSize: `${totalW}px ${totalH}px`,
              transform: `rotate(${rotate}deg)`,
              transformOrigin: 'center',
              opacity: i === current ? 1 : 0,
              transition: 'none',
            }}
          />
        ))}
      </div>
    </div>
  )
}

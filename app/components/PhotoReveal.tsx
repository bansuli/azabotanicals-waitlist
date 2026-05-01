'use client'
import { useEffect, useState } from 'react'

const PHOTOS = [
  { src: '/photos/c1.png', cols: 2, rows: 2 },
  { src: '/photos/c2.png', cols: 2, rows: 1 },
  { src: '/photos/c3.png', cols: 2, rows: 2 },
  { src: '/photos/c4.png', cols: 2, rows: 1 },
]

const PIECE_DELAY = 220
const HOLD = 1000
const FADE = 400

function Piece({ src, col, row, cols, rows, visible }: {
  src: string
  col: number
  row: number
  cols: number
  rows: number
  visible: boolean
}) {
  return (
    <div style={{
      position: 'absolute',
      left: `${(col / cols) * 100}%`,
      top: `${(row / rows) * 100}%`,
      width: `${100 / cols}%`,
      height: `${100 / rows}%`,
      overflow: 'hidden',
      opacity: visible ? 1 : 0,
      transform: visible ? 'scale(1)' : 'scale(1.05)',
      transition: `opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)`,
    }}>
      <img
        src={src}
        alt=""
        style={{
          position: 'absolute',
          left: `${-col * 100}%`,
          top: `${-row * 100}%`,
          width: `${cols * 100}%`,
          height: `${rows * 100}%`,
          objectFit: 'cover',
          display: 'block',
        }}
      />
    </div>
  )
}

export default function PhotoReveal({ onDone }: { onDone: () => void }) {
  const [photoIndex, setPhotoIndex] = useState(0)
  const [visiblePieces, setVisiblePieces] = useState(0)
  const [opacity, setOpacity] = useState(1)

  const photo = PHOTOS[photoIndex]
  const { cols, rows } = photo
  const totalPieces = cols * rows

  useEffect(() => {
    if (visiblePieces < totalPieces) {
      const t = setTimeout(() => setVisiblePieces(v => v + 1), PIECE_DELAY)
      return () => clearTimeout(t)
    }

    const t = setTimeout(() => {
      setOpacity(0)
      setTimeout(() => {
        if (photoIndex < PHOTOS.length - 1) {
          setPhotoIndex(i => i + 1)
          setVisiblePieces(0)
          setOpacity(1)
        } else {
          onDone()
        }
      }, FADE)
    }, HOLD)
    return () => clearTimeout(t)
  }, [visiblePieces, totalPieces, photoIndex, onDone])

  const pieces = []
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const idx = row * cols + col
      pieces.push(
        <Piece
          key={`${col}-${row}`}
          src={photo.src}
          col={col}
          row={row}
          cols={cols}
          rows={rows}
          visible={idx < visiblePieces}
        />
      )
    }
  }

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      position: 'relative',
      background: '#EAE6DE',
      opacity,
      transition: `opacity ${FADE}ms ease`,
    }}>
      {pieces}
    </div>
  )
}

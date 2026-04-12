import { ImageResponse } from 'next/og'

export const alt = 'Alex De Souza — Founder & CTO'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0D0D0D',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top — monogram */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '60px',
            height: '60px',
            border: '2px solid #F0EBE0',
            color: '#F0EBE0',
            fontSize: '20px',
            fontWeight: '800',
          }}
        >
          AS
        </div>

        {/* Center — name */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontSize: '96px',
              fontWeight: '800',
              color: '#F0EBE0',
              lineHeight: '0.9',
              letterSpacing: '-2px',
            }}
          >
            ALEX DE SOUZA
          </div>
          <div
            style={{
              fontSize: '24px',
              color: '#FFE500',
              fontFamily: 'monospace',
              letterSpacing: '0.08em',
            }}
          >
            FOUNDER &amp; CTO — IMPULSOLEAD
          </div>
        </div>

        {/* Bottom — url */}
        <div
          style={{
            fontSize: '16px',
            color: '#888880',
            fontFamily: 'monospace',
            letterSpacing: '0.1em',
          }}
        >
          ALEXSOUZA.DEV
        </div>
      </div>
    ),
    { ...size }
  )
}

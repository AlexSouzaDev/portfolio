import { ImageResponse } from 'next/og'
import { site } from '@/content/site'

export const alt = site.title
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background:
            'radial-gradient(circle at top, rgba(103,161,255,0.25), transparent 28%), linear-gradient(180deg, #0a1322 0%, #07111f 100%)',
          color: '#f5f9ff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: '999px',
              padding: '14px 22px',
              fontSize: 18,
              letterSpacing: '0.3em',
            }}
          >
            ALEX DE SOUZA
          </div>
          <div
            style={{
              fontSize: 18,
              color: 'rgba(151,241,255,0.85)',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
            }}
          >
            Founder Platform
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 860 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: 86,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: '-0.06em',
            }}
          >
            <span>Founder, Engineer</span>
            <span>&amp; Product Builder</span>
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.4, color: 'rgba(245,249,255,0.72)' }}>
            Premium digital products, AI systems, and founder-grade execution with real technical depth.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 18,
            color: 'rgba(245,249,255,0.5)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}
        >
          <div>Aveiro, Portugal</div>
          <div>alexsouza.dev</div>
        </div>
      </div>
    ),
    size
  )
}

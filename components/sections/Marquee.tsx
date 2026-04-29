export function Marquee() {
  const row1 =
    'FOUNDER & CTO ✦ AI SAAS ARCHITECT ✦ NEXT.JS · TYPESCRIPT ✦ ANTHROPIC SDK ✦ REAL ESTATE TECH ✦ FULL-STACK ENGINEER ✦ MLOPS CERTIFIED ✦ OPEN TO SELECT PROJECTS ✦ BUILDING IN PORTUGAL 🇵🇹 ✦ SHIPPING TO BRAZIL 🇧🇷 ✦ '

  const row2 =
    'IMPULSOLEAD.COM ✦ IMPULSOSEARCH.COM ✦ NEXT.JS · PYTHON · POSTGRESQL · REDIS ✦ ANTHROPIC CLAUDE SDK ✦ DOCKER · VERCEL · CI/CD ✦ CLERK AUTH · TRPC · PRISMA ✦ 2 LIVE PRODUCTS ✦ ALEXSOUZA.DEV ✦ '

  return (
    <div
      className="w-full overflow-hidden"
      aria-label="Identity and skills strip"
    >
      {/* Row 1 — forward */}
      <div
        className="flex whitespace-nowrap h-[40px] items-center"
        style={{
          background: '#D6FF3F',
          borderTop: '1px solid rgba(0,0,0,0.1)',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
        }}
        aria-hidden="true"
      >
        <div className="flex whitespace-nowrap animate-marquee-slow">
          <span
            className="font-mono text-[11px] uppercase tracking-[0.09em] inline-block"
            style={{ color: '#080808' }}
          >
            {row1}
          </span>
          <span
            className="font-mono text-[11px] uppercase tracking-[0.09em] inline-block"
            style={{ color: '#080808' }}
          >
            {row1}
          </span>
        </div>
      </div>

      {/* Row 2 — reverse, subtle */}
      <div
        className="flex whitespace-nowrap h-[36px] items-center"
        style={{
          background: 'rgba(255,255,255,0.02)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
        aria-hidden="true"
      >
        <div className="flex whitespace-nowrap animate-marquee-reverse-slow">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.1em] inline-block"
            style={{ color: 'rgba(255,255,255,0.2)' }}
          >
            {row2}
          </span>
          <span
            className="font-mono text-[10px] uppercase tracking-[0.1em] inline-block"
            style={{ color: 'rgba(255,255,255,0.2)' }}
          >
            {row2}
          </span>
        </div>
      </div>
    </div>
  )
}

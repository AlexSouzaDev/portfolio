export function Marquee() {
  const content =
    'FOUNDER & CTO ✦ AI SAAS ARCHITECT ✦ NEXT.JS + TYPESCRIPT ✦ ANTHROPIC SDK ✦ REAL ESTATE TECH ✦ FULL-STACK ENGINEER ✦ MLOPS CERTIFIED ✦ MICROSOFT CERTIFIED ✦ OPEN TO SELECT PROJECTS ✦ BASED IN PORTUGAL 🇵🇹 ✦ SHIPPING FOR BRAZIL 🇧🇷 ✦ '

  return (
    <div
      className="marquee-wrapper relative w-full h-[44px] flex items-center overflow-hidden"
      style={{
        background: '#FFE500',
        borderTop: '2px solid #0D0D0D',
        borderBottom: '2px solid #0D0D0D',
      }}
      aria-label="Skills and identity marquee"
    >
      <div
        className="flex whitespace-nowrap animate-marquee"
        aria-hidden="true"
      >
        {/* Two copies for seamless loop */}
        <span
          className="font-mono text-[12px] uppercase tracking-[0.08em] inline-block"
          style={{ color: '#0D0D0D' }}
        >
          {content}
        </span>
        <span
          className="font-mono text-[12px] uppercase tracking-[0.08em] inline-block"
          style={{ color: '#0D0D0D' }}
        >
          {content}
        </span>
      </div>
    </div>
  )
}

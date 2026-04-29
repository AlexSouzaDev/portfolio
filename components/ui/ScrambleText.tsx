'use client'

import { useState } from 'react'
import { useScrambleText } from '@/hooks/useScrambleText'

export function ScrambleText({ text }: { text: string }) {
  const [active, setActive] = useState(false)
  const scrambled = useScrambleText(text, active)

  return (
    <span
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      {scrambled}
    </span>
  )
}

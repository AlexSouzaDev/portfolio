'use client'

import { useEffect, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

export function useScrambleText(value: string, active: boolean) {
  const [text, setText] = useState(value)

  useEffect(() => {
    if (!active) {
      setText(value)
      return
    }

    let frame = 0
    const interval = window.setInterval(() => {
      frame += 1
      setText(
        value
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < frame / 2) return value[index]
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )

      if (frame >= value.length * 2) {
        window.clearInterval(interval)
        setText(value)
      }
    }, 24)

    return () => window.clearInterval(interval)
  }, [active, value])

  return text
}

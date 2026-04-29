'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { motion } from 'framer-motion'
import { supportsHover } from '@/lib/utils'

type CursorState = {
  setCursorLabel: (label?: string) => void
}

const CursorContext = createContext<CursorState>({
  setCursorLabel: () => undefined,
})

export function useCursor() {
  return useContext(CursorContext)
}

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false)
  const [cursorLabel, setCursorLabel] = useState<string>()
  const [active, setActive] = useState(false)
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const raf = useRef<number>()

  useEffect(() => {
    if (!supportsHover()) return
    setEnabled(true)

    const onMove = (event: MouseEvent) => {
      mouse.current = { x: event.clientX, y: event.clientY }
    }

    const onOver = (event: Event) => {
      const target = (event.target as HTMLElement | null)?.closest('[data-cursor-label], a, button')
      if (!target) {
        setActive(false)
        setCursorLabel(undefined)
        return
      }

      setActive(true)
      setCursorLabel(target.getAttribute('data-cursor-label') || 'OPEN')
    }

    const tick = () => {
      current.current.x += (mouse.current.x - current.current.x) * 0.16
      current.current.y += (mouse.current.y - current.current.y) * 0.16

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%) scale(${active ? 1.9 : 1})`
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%) scale(${active ? 0.72 : 1})`
      }

      raf.current = window.requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver)
    raf.current = window.requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      if (raf.current) window.cancelAnimationFrame(raf.current)
    }
  }, [active])

  const value = useMemo(() => ({ setCursorLabel }), [])

  return (
    <CursorContext.Provider value={value}>
      {children}
      {enabled && (
        <>
          <div ref={ringRef} className="custom-cursor-ring">
            {cursorLabel ? <span className="custom-cursor-label">{cursorLabel}</span> : null}
          </div>
          <motion.div ref={dotRef} className="custom-cursor-dot" />
        </>
      )}
    </CursorContext.Provider>
  )
}

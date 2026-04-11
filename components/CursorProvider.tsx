'use client'

import { useEffect, useRef } from 'react'

export function CursorProvider() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: -100, y: -100 })

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      cursor.style.left = e.clientX + 'px'
      cursor.style.top = e.clientY + 'px'
    }

    const onEnterHoverable = (e: Event) => {
      const target = e.target as HTMLElement
      if (!cursor) return
      cursor.classList.add('hovering')
      if (target.tagName === 'A' || target.closest('a')) {
        cursor.classList.add('on-link')
      }
    }

    const onLeaveHoverable = () => {
      if (!cursor) return
      cursor.classList.remove('hovering', 'on-link')
    }

    document.addEventListener('mousemove', onMove)

    const hoverables = document.querySelectorAll<HTMLElement>(
      'a, button, [data-cursor]'
    )

    const addListeners = () => {
      document.querySelectorAll<HTMLElement>('a, button, [data-cursor]').forEach((el) => {
        el.addEventListener('mouseenter', onEnterHoverable)
        el.addEventListener('mouseleave', onLeaveHoverable)
      })
    }

    addListeners()

    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      observer.disconnect()
    }
  }, [])

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />
}

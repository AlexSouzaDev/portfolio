'use client'

import { useEffect, useRef } from 'react'

export function CursorProvider() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const onMove = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px'
      cursor.style.top = e.clientY + 'px'
    }

    const onEnter = (e: Event) => {
      const target = e.target as HTMLElement
      cursor.classList.add('hovering')
      if (target.tagName === 'A' || target.closest('a')) {
        cursor.classList.add('on-link')
      }
    }

    const onLeave = () => {
      cursor.classList.remove('hovering', 'on-link')
    }

    document.addEventListener('mousemove', onMove)

    const attach = () => {
      document.querySelectorAll<HTMLElement>('a, button, [data-cursor]').forEach((el) => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    attach()

    const observer = new MutationObserver(attach)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      observer.disconnect()
    }
  }, [])

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />
}

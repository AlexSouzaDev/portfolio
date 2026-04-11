'use client'

import dynamic from 'next/dynamic'

const TerminalChat = dynamic(
  () => import('./TerminalChat').then((m) => m.TerminalChat),
  { ssr: false }
)

export function TerminalChatClient() {
  return <TerminalChat />
}

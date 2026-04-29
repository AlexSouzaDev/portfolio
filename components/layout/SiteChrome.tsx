'use client'

import { CursorProvider } from '@/components/cursor/CursorProvider'
import { SiteNav } from '@/components/layout/SiteNav'
import { SpotlightLayer } from '@/components/ui/SpotlightLayer'

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <CursorProvider>
      <SpotlightLayer />
      <SiteNav />
      {children}
    </CursorProvider>
  )
}

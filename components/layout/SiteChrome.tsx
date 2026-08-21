import { SiteNav } from '@/components/layout/SiteNav'

/* No cursor provider, no spotlight layer, no magnetic anything. */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNav />
      {children}
    </>
  )
}

import { HomeCard } from '@/components/sections/HomeCard'
import { WorkIndex } from '@/components/sections/WorkIndex'
import { Disciplines } from '@/components/sections/Disciplines'
import { Journey } from '@/components/sections/Journey'
import { Numbers } from '@/components/sections/Numbers'
import { ReplyCard } from '@/components/sections/ReplyCard'
import { SiteFooter } from '@/components/layout/SiteFooter'

export default function HomePage() {
  return (
    <>
      <main>
        <HomeCard />
        <WorkIndex />
        <Disciplines />
        <Journey />
        <Numbers />
        <ReplyCard />
      </main>
      <SiteFooter />
    </>
  )
}

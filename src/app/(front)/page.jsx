'use client'

import MainHero from '@/components/LandingPage/MainHero'
import MainStats from '@/components/LandingPage/MainStats'
import MainFooter from '@/components/LandingPage/MainFooter'
import MainInfo from '@/components/LandingPage/MainInfo'

export default function Home() {
  return (
    <>
      <div className='global-full-viewport landing-background absolute left-0 top-0 -z-10 flex w-full flex-row justify-center opacity-50'></div>
      <MainHero />
      <MainStats />
      <MainInfo />
      <MainFooter />
    </>
  )
}

"use client";

import MainHero from "@/components/LandingPage/MainHero";
import MainStats from "@/components/LandingPage/MainStats";
import MainFooter from "@/components/LandingPage/MainFooter";
import MainInfo from "@/components/LandingPage/MainInfo";

export default function Home() {
  return (
    <> 
      <div className="absolute top-0 left-0 -z-10 w-full opacity-50 flex flex-row justify-center global-full-viewport landing-background"></div>
      <MainHero/>
      <MainStats />
      <MainInfo />
      <MainFooter />
    </>
  );
}

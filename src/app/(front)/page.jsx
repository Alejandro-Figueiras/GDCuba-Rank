"use client";

import BetaHomePage from "@/components/Beta/BetaHomePage";
import MainHero from "@/components/LandingPage/MainHero";

export default function Home() {
  return (
    <> 
      <div className="absolute top-0 left-0 -z-10 w-full opacity-50 flex flex-row justify-center global-full-viewport landing-background">
      </div>
      <MainHero/>
      <div>
        <BetaHomePage />
      </div>
    </>
  );
}

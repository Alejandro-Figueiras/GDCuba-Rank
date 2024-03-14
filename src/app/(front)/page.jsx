"use client";

import BetaHomePage from "@/components/Beta/BetaHomePage";
import MainHero from "@/components/LandingPage/MainHero";

export default function Home() {
  return (
    <>
      <MainHero/>
      <div>
        <BetaHomePage />
      </div>
    </>
  );
}

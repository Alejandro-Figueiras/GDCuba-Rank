"use client";

import { useContext } from "react";
import { useState, useEffect } from "react";
import { songTest } from "./songTest";
import { useGDIconRef } from "@/robtop/iconkit/useGDIcon";

export default function Home() {
  const {icon: icon} = useGDIconRef({type: 'jetpack', iconNumber: 3, glow: 1})

  return (
    <>
      <h1 className="text-center text-lg mt-8"> Home Page</h1>
      <img src="" alt="" ref={icon}/>
    </>
  );
}

"use client";

import { useContext } from "react";
import { useState, useEffect } from "react";
import { songTest } from "./songTest";

export default function Home() {
  const [song, setSong] = useState("");
  useEffect(() => {
    songTest().then(newSong => {
      console.log(newSong)
      setSong(newSong)
    })
  }, [])
  return (
    <>
      <h1 className="text-center text-lg mt-8"> Home Page</h1>
      <p>{song}</p>
    </>
  );
}

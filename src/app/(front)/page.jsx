"use client";

import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";
import GDIcon from "@/robtop/iconkit/GDIcon";

export default function Home() {
  const { openModal } = useContext(ModalContext);
  return (
    <>
      <button
        onClick={async () => {
          
        }}
      >
        Test
      </button>
      {/* <GDIcon type="robot" iconNumber={25} imageStyles={{border: "2px solid red"}} c2={5} glow={true}/> */}
      <GDIcon type="ship" iconNumber={28} imageStyles={{border: "2px solid red"}} c2={5} glow={true}/>
      {/* <GDIcon type="cube" iconNumber={1} imageStyles={{border: "2px solid red"}} c2={6} glow={true}/> */}
    </>
  );
}

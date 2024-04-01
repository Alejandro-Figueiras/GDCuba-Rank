"use client"

import { getIconTextures } from "@/robtop/iconkit/getIconTextures"
import { getLayerSprite } from "@/robtop/iconkit/getLayerSprite"
import { makeIcon } from "@/robtop/iconkit/makeIcon"
import { useGDIcon } from "@/robtop/iconkit/useGDIcon"
import { Application, Assets, Sprite, Spritesheet } from "pixi.js"
import { useEffect, useState, useRef } from "react"

export default () => {
  const {icon} = useGDIcon({
    type: 'cube',
    iconNumber: 1,
    
  })

  return (<div className="p-4">
    <img src={icon}/>
  </div>)
}
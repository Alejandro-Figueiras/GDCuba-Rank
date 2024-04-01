"use client"

import { getIconTextures } from "@/robtop/iconkit/newIcons/getIconTextures"
import { getLayerSprite } from "@/robtop/iconkit/newIcons/getLayerSprite"
import { makeIcon } from "@/robtop/iconkit/newIcons/makeIcon"
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
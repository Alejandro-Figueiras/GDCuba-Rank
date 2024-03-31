"use client"

import { getIconTextures } from "@/robtop/iconkit/newIcons/getIconTextures"
import { getLayerSprite } from "@/robtop/iconkit/newIcons/getLayerSprite"
import { useGDIcon } from "@/robtop/iconkit/useGDIcon"
import { Application, Assets, Sprite, Spritesheet } from "pixi.js"
import { useEffect, useState, useRef } from "react"

export default () => {
  const contRef = useRef()
  const [data, setData] = useState('')
  
  useEffect(() => {
    const app = new Application();
    app.init({
      background: "#222222",
      width: 300,
      height: 300
    }).then(async() => {
      // contRef.current.appendChild(app.canvas)
      const { textures, spritesInfo, spritesheet } = await getIconTextures({
        type: 'cube',
        iconNumber: 1,
        hostURL: 'http://localhost:3000'
      })

      // const cube = new Sprite(textures["player_01_001.png"])
      // console.log(cube.width, cube.height)
      // cube.tint = '#ff0000'
      // cube.rotation = 45;
      // console.log(cube.width, cube.height)

      const cube = await getLayerSprite({
        texture: textures["player_01_001.png"],
        info: spritesInfo["player_01_001.png"],
        color: {
          r: 255,
          g: 0,
          b: 0
        },
        rotate: 45
      })
      app.stage.addChild(cube)
      cube.anchor.set(0.5)
      cube.x = app.screen.width / 2
      cube.y = app.screen.height / 2
      app.render()
      setData(app.canvas.toDataURL())
    })
  }, []);




  return (<div className="p-4" ref={contRef}>
    <img src={data}/>
  </div>)
}
'use client'
import gameSheet from './gameSheet.json'
import colors from './colors.json'
import Jimp from 'jimp'
import { getLayer } from './getLayer';
import { useEffect, useState, useRef } from 'react';

const types = {
  cube: 'player',
  ufo: 'bird',
  wave: 'dart',
  robot: 'robot',
  spider: 'spider',
  ship: 'ship',
  ball: 'player_ball'
}

const GDIcon = ({type = "cube", iconNumber = 1, c1 = 1, c2 = 2, imageStyles = {}, imageClassNames = ""}) => {
  const printCanvas = useRef()
  const finalImage = useRef()

  // ------- Getting Sprites
  const sprites = []
  let fullW = 0;
  let fullH = 0;
  for (const sprite of Object.keys(gameSheet)) {
    
    let spriteInfo = sprite.split("_");
    if (spriteInfo[1] == "ball") {
      const newSprite = ['player_ball'];
      for (let i = 2; i < spriteInfo.length; i++) {
        newSprite.push(spriteInfo[i])
      }
      spriteInfo = newSprite;
    }

    if (spriteInfo[0] == types[type] && parseInt(spriteInfo[1]) == iconNumber) {
      sprites.push(spriteInfo)
      fullW=Math.max(gameSheet[sprite].spriteSize[0], fullW)
      fullH=Math.max(gameSheet[sprite].spriteSize[1], fullH)
    }
  }
  
  // Coloring sprites
  useEffect(() => {
    console.log("Starting...")
    const layers = []
    const ctx = printCanvas.current.getContext(`2d`)
    for (const sprite of sprites) {
      let color = null;
      if (sprite[2]=='001.png') {
        color = colors[c1];
      } else if (sprite[2]=='2') {
        color = colors[c2];
      }
      const path = sprite.join('_');
      const url = `http://localhost:3000/assets/iconkit/${path}`
      const spriteOffset = gameSheet[path].spriteOffset
      const spriteSize = gameSheet[path].spriteSize
      getLayer({url, path, color}).then(layer => {
        const img = document.createElement('img')
        img.src = layer
        ctx.drawImage(
          img, 
          fullW/2 - spriteSize[0]/2 + spriteOffset[0],
          fullH/2 - spriteSize[1]/2 + spriteOffset[1]
        )
        const data = printCanvas.current.toDataURL();
        finalImage.current.src = data;
      })
      // TODO glow
    }
  }, [])
  
  return (
    <>
      <canvas style={{display: 'none'}} ref={printCanvas} width={fullW} height={fullH}></canvas>
      <img src="/assets/default_icon.png" alt="Icon" ref={finalImage} style={imageStyles} className={imageClassNames}/>
    </>
  )
}

export default GDIcon;

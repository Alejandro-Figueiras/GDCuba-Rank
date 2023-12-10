'use client'
import gameSheet from './gameSheet.json'
import colors from './colors.json'
import { getLayer } from './getLayer';
import { useEffect, useRef } from 'react';
import debounce from 'just-debounce-it'

const types = {
  cube: 'player',
  ufo: 'bird',
  wave: 'dart',
  robot: 'robot',
  spider: 'spider',
  ship: 'ship',
  ball: 'player_ball'
}

const GDIcon = ({type = "cube", iconNumber = 1, c1 = 1, c2 = 2, glow = false, imageStyles = {}, imageClassNames = ""}) => {
  const printCanvas = useRef()
  const finalImage = useRef()

  // ------- Getting Sprites
  const sprites = []
  let WS = 0, WI = 0, HS = 0, HI = 0;
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
      WS = Math.max(Math.abs(gameSheet[sprite].spriteSize[0]/2-gameSheet[sprite].spriteOffset[0]), WS)
      WI = Math.max(Math.abs(gameSheet[sprite].spriteSize[0]/2+gameSheet[sprite].spriteOffset[0]), WI)
      HS = Math.max(Math.abs(gameSheet[sprite].spriteSize[1]/2+gameSheet[sprite].spriteOffset[1]), HS)
      HI = Math.max(Math.abs(gameSheet[sprite].spriteSize[1]/2-gameSheet[sprite].spriteOffset[1]), HI)
    }
  }

  console.log(WS, WI, HS, HI, "finalmente", WS+WI, HS+HI)
  
  // truco maluco para optimizar XDDD
  const upadteImageSrc = debounce(() => {
    const data = printCanvas.current.toDataURL();
    finalImage.current.src = data;
  }, 100);


  // Coloring sprites
  useEffect(() => {
    const ctx = printCanvas.current.getContext(`2d`)
    for (const sprite of sprites) {
      let color = null;

      const spriteLayer = (['robot', 'spider'].includes(sprite[0]))
       ? sprite[3]
       : sprite[2]
      if (spriteLayer=='001.png') {
        color = colors[c1];
      } else if (spriteLayer=='2') {
        color = colors[c2];
      } else if (spriteLayer == 'glow' && !glow) {
        continue;
      }

      const path = sprite.join('_');
      const currentUrl = window.location.href;
      const hostURL = currentUrl.split("/").slice(0,3).join("/")
      const url = `${hostURL}/assets/iconkit/${path}`
      
      const spriteOffset = gameSheet[path].spriteOffset
      const spriteSize = gameSheet[path].spriteSize
      getLayer({url, path, color}).then(layer => {
        const img = document.createElement('img')
        img.src = layer
        ctx.drawImage(
          img, 
          WS - spriteSize[0]/2 + spriteOffset[0],
          HS - spriteSize[1]/2 - spriteOffset[1]
        )
        upadteImageSrc() // <- Función debounce
      })
    }
  }, [])
  
  return (
    <>
      <canvas style={{display: 'none'}} ref={printCanvas} width={WS+WI} height={HS+HI}></canvas>
      <img src="/assets/default_icon.png" alt="Icon" ref={finalImage} style={imageStyles} className={imageClassNames}/>
    </>
  )
}

export default GDIcon;

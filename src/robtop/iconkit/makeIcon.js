'use server'

import Jimp from 'jimp';
import { getIconSprites } from './getIconSprites';
import gameSheet from './gameSheet.json'
import colors from './colors.json'
import robotInfo from './robotInfo.json'
import { getLayer } from './getLayer';

const layerPriority = {
  'glow': 1,
  '3': 2, // capsula del ufo
  '2': 3,
  '001.png': 4,
  'extra': 5
}

export const makeIcon = async({type, iconNumber, c1, c2, glow, hostURL}) => {
  const {sprites, WS, WI, HS, HI} = getIconSprites({type, iconNumber})
  const fullImage = new Jimp(WS+WI, HS+HI)

  const printSprite = async({sprite, rotate = null, offsetX = 0, offsetY = 0, scale = null}) => {
    let color = null;
    
    const spriteLayer = (['robot', 'spider'].includes(sprite[0]))
    ? sprite[3]
    : sprite[2]
    if (spriteLayer=='001.png') {
      color = colors[c1];
    } else if (spriteLayer=='2') {
      color = colors[c2];
    } else if (spriteLayer == 'glow' && !glow) {
      return;
    }

    const path = sprite.join('_');
    const url = `${hostURL}/assets/iconkit/${path}`
    
    const spriteOffset = gameSheet[path].spriteOffset
    const layer = await getLayer({url, path, color, rotate})
    fullImage.composite(
      layer, 
      WS - layer.getWidth()/2 + spriteOffset[0] + offsetX,
      HS - layer.getHeight()/2 - spriteOffset[1] - offsetY
      )
  }

  sprites.sort((a,b) => {
    const aP = layerPriority[a[3]] | 8;
    const bP = layerPriority[b[3]] | 8;
    return aP - bP; 
  })

  if (type == "robot") {
    for (const frame of robotInfo) {
      for (const sprite of sprites) {
        if (parseInt(sprite[2]) == frame.part)
          await printSprite({
            sprite, 
            rotate: frame.rotation*-1,
            offsetX: frame.pos[0]*4,
            offsetY: frame.pos[1]*4,
            scale: frame.scale
          })
      }
    }
  } else { // demas iconos
    for (const sprite of sprites) {
      await printSprite({sprite})
    }
  }

  return await fullImage.getBase64Async(Jimp.MIME_PNG)
}
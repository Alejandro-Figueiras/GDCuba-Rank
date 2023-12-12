'use server'

import Jimp from 'jimp';
import { getIconSprites } from './getIconSprites';
import gameSheet from './gameSheet.json'
import colors from './colors.json'
import robotInfo from './robotInfo.json'
import spiderInfo from './spiderInfo.json'
import { getLayer } from './getLayer';

const layerPriority = {
  'glow': 1,
  '3': 2, // capsula del ufo
  '2': 3,
  '001.png': 4,
  'extra': 5
}

const printSprites = async(spritesToPrint) => {
  let WS = 0, WI = 0, HS = 0, HI = 0;
  for (const sprite of spritesToPrint) {
    WS = Math.max(Math.abs(sprite.w/2-gameSheet[sprite.path].spriteOffset[0]+sprite.offsetX), WS)
    WI = Math.max(Math.abs(sprite.w/2+gameSheet[sprite.path].spriteOffset[0]+sprite.offsetX), WI)
    HS = Math.max(Math.abs(sprite.h/2+gameSheet[sprite.path].spriteOffset[1]+sprite.offsetY), HS)
    HI = Math.max(Math.abs(sprite.h/2-gameSheet[sprite.path].spriteOffset[1]+sprite.offsetY), HI)  
  }
  const fullImage = new Jimp(WS+WI, HS+HI);
  for (const sprite of spritesToPrint) {
    fullImage.composite(sprite.layer, WS+sprite.x, HS+sprite.y, {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacityDest: 1,
      opacitySource: 1
    })
  }
  return await fullImage.getBase64Async(Jimp.MIME_PNG)
}

export const makeIcon = async({type, iconNumber, c1, c2, glow, hostURL}) => {
  const {sprites} = getIconSprites({type, iconNumber})
  const spritesToPrint = []
  
  const makeSprites = async({sprite, rotate = null, offsetX = 0, offsetY = 0, scale = null}) => {
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
    const layer = await getLayer({url, path, color, rotate, scale})
    spritesToPrint.push({
      path,
      layer, 
      x: 0-layer.getWidth()/2 + spriteOffset[0] + offsetX,
      y: 0-layer.getHeight()/2 - spriteOffset[1] - offsetY,
      w: layer.getWidth(),
      h: layer.getHeight(),
      offsetX,
      offsetY
    })
  }

  sprites.sort((a,b) => {
    const aP = layerPriority[a[(['robot', 'spider'].includes(type))?3:2]] | 8;
    const bP = layerPriority[b[(['robot', 'spider'].includes(type))?3:2]] | 8;
    return aP - bP; 
  })

  if (type == "robot" || type == "spider") {
    for (const frame of (type == "robot") ? robotInfo : spiderInfo) {
      for (const sprite of sprites) {
        if (parseInt(sprite[2]) == frame.part)
          await makeSprites({
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
      await makeSprites({sprite})
    }
  }

  return await printSprites(spritesToPrint);
}
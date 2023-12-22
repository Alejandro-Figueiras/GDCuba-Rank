'use server'

import Jimp from 'jimp';
import { getIconSprites } from './getIconSprites';
import colors from './colors.json'
import robotInfo from './robotInfo.json'
import spiderInfo from './spiderInfo.json'
import { getLayer } from './getLayer';

const icon21 = {
  cube: 142,
  ship: 51,
  ball: 43,
  ufo: 35,
  wave: 35,
  robot: 26,
  spider: 17,
  colors: 41,
}

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
    WS = Math.max(Math.abs(sprite.w/2-sprite.spriteOffset[0]+sprite.offsetX), WS)
    WI = Math.max(Math.abs(sprite.w/2+sprite.spriteOffset[0]+sprite.offsetX), WI)
    HS = Math.max(Math.abs(sprite.h/2+sprite.spriteOffset[1]+sprite.offsetY), HS)
    HI = Math.max(Math.abs(sprite.h/2-sprite.spriteOffset[1]+sprite.offsetY), HI)  
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

/**
 * Se utiliza para renderizar la imagen en formado Base64Url de un icono seleccionado
 * @param {*} Consultar documentación
 * @returns Image Base64Url
 */
export const makeIcon = async({type, iconNumber, c1, c2, glow, hostURL}) => {
  if (iconNumber>icon21[type]) {iconNumber=1};
  if (c1>icon21.colors) {c1=0};
  if (c2>icon21.colors) {c2=5};
  const {sprites, spritesInfo, spriteSheet} = await getIconSprites({type, iconNumber, hostURL})
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
    } else if (spriteLayer == 'glow') {
      if (!glow) return;
      color = colors[c2];
    }

    const path = sprite.join('_');
    const spriteOffset = spritesInfo[path].spriteOffset
    const layer = await getLayer({spriteSheet, info: spritesInfo[path], color, rotate, scale})
    spritesToPrint.push({
      path,
      layer, 
      x: 0-layer.getWidth()/2 + spriteOffset[0] + offsetX,
      y: 0-layer.getHeight()/2 - spriteOffset[1] - offsetY,
      w: layer.getWidth(),
      h: layer.getHeight(),
      offsetX,
      offsetY,
      spriteOffset: spritesInfo[path].spriteOffset
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
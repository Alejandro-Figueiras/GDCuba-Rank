'use client'
import { Assets, Spritesheet } from "pixi.js"

const types = {
  cube: 'player',
  ufo: 'bird',
  wave: 'dart',
  robot: 'robot',
  spider: 'spider',
  ship: 'ship',
  ball: 'player_ball',
  swing: 'swing',
  jetpack: 'jetpack'
}

export const getIconTextures = async({type, iconNumber, hostURL}) => {
  const path = `${types[type]}_${(iconNumber< 10)?'0'+iconNumber:iconNumber}`

  const padrePath = `${hostURL}/assets/gdicons/${path}-uhd.png`
  const plistPath = `${hostURL}/assets/gdicons/${path}-uhd.json`

  const sheetTexture = await Assets.load(padrePath);
  const plist = await (await fetch(plistPath)).json()
  const sheetData = {
    frames: {},
    meta: {
      scale: 1,
      size: {
        w: sheetTexture.width,
        h: sheetTexture.height
      }
    }
  }
  
  for (const key of Object.keys(plist)) {
    sheetData.frames[key] = {
      frame: {
        x: plist[key].textureRect.pos[0],
        y: plist[key].textureRect.pos[1],
        w: plist[key].textureRect.size[0],
        h: plist[key].textureRect.size[1]
      },
    }
  }

  const spritesheet = new Spritesheet(sheetTexture, sheetData)
  await spritesheet.parse();
  const textures = spritesheet.textures

  return { textures, spritesInfo: plist, spritesheet }
}
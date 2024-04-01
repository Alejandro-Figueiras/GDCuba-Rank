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

  const layerNames = []
  
  for (const key of Object.keys(plist)) {
    let size = plist[key].textureRect.size;
    if (plist[key].textureRotated) size = [...size].reverse()

    sheetData.frames[key] = {
      frame: {
        x: plist[key].textureRect.pos[0],
        y: plist[key].textureRect.pos[1],
        w: size[0],
        h: size[1]
      },
    }

    let layerInfo = key.split("_");
    if (layerInfo[1] == "ball") {
      const newSprite = ['player_ball'];
      for (let i = 2; i < layerInfo.length; i++) {
        newSprite.push(layerInfo[i])
      }
      layerInfo = newSprite;
    }
    layerNames.push(layerInfo)
  }

  const spritesheet = new Spritesheet(sheetTexture, sheetData)
  await spritesheet.parse();
  const textures = spritesheet.textures
  spritesheet.destroy()

  return { textures, spritesInfo: plist, layerNames }
}
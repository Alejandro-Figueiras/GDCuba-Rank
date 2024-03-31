"use server"
import Jimp from 'jimp'
import gameSheet from './gameSheet.json'

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

export const getIconSprites = async({type, iconNumber, hostURL}) => {
  const path = `${types[type]}_${(iconNumber< 10)?'0'+iconNumber:iconNumber}`
  const fullPath = `${path}-uhd.png`;

  const padrePath = `${hostURL}/assets/gdicons/${fullPath}`
  const padre = await Jimp.read(padrePath)

  const sprites = []
  for (const sprite of Object.keys(gameSheet[path])) {
    let spriteInfo = sprite.split("_");
    if (spriteInfo[1] == "ball") {
      const newSprite = ['player_ball'];
      for (let i = 2; i < spriteInfo.length; i++) {
        newSprite.push(spriteInfo[i])
      }
      spriteInfo = newSprite;
    }
    sprites.push(spriteInfo)

  }

  return { sprites, spritesInfo: gameSheet[path], spriteSheet: padre }
}
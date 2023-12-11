"use server"
import gameSheet from './gameSheet.json'

const types = {
  cube: 'player',
  ufo: 'bird',
  wave: 'dart',
  robot: 'robot',
  spider: 'spider',
  ship: 'ship',
  ball: 'player_ball'
}

export const getIconSprites = ({type, iconNumber}) => {
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
      WS = Math.max(Math.abs(gameSheet[sprite].spriteSourceSize[0]/2-gameSheet[sprite].spriteOffset[0]), WS)
      WI = Math.max(Math.abs(gameSheet[sprite].spriteSourceSize[0]/2+gameSheet[sprite].spriteOffset[0]), WI)
      HS = Math.max(Math.abs(gameSheet[sprite].spriteSourceSize[1]/2+gameSheet[sprite].spriteOffset[1]), HS)
      HI = Math.max(Math.abs(gameSheet[sprite].spriteSourceSize[1]/2-gameSheet[sprite].spriteOffset[1]), HI)
    }
  }

  return { sprites, WS, WI, HS, HI}
}
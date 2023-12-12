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
    }
  }

  return { sprites }
}
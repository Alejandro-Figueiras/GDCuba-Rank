"use server"
import gameSheet from './gameSheet.json'
import robotInfo from './robotInfo.json'

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
      if (type == 'robot') {
        for (const frame of robotInfo) {
          if (parseInt(spriteInfo[2]) == frame.part) {
            const W = gameSheet[sprite].spriteSize[0];
            const H = gameSheet[sprite].spriteSize[1];
            const angle = frame.rotation;
            const WF = (angle) ? Math.abs(Math.ceil((H*Math.sin(angle)) + (W*Math.cos(angle)))) : W
            const HF = (angle) ? Math.abs(Math.ceil((H*Math.cos(angle)) + (W*Math.sin(angle)))) : H

            // TODO solucionar dimensiones con el width, no entiendo el por qué del error
            // console.log(frame.part, W, H, WF, HF) <- usa esto para debuguear, averigua por qué 
            //                                          salen numeros tan grandes

            WS = Math.max(Math.abs(WF/2 - gameSheet[sprite].spriteOffset[0] - frame.pos[0]*2)+2, WS)
            WI = Math.max(Math.abs(WF/2 + gameSheet[sprite].spriteOffset[0] - frame.pos[0]*2)+2, WI)
            HS = Math.max(Math.abs(HF/2 + gameSheet[sprite].spriteOffset[1] - frame.pos[1]*2)+2, HS)
            HI = Math.max(Math.abs(HF/2 - gameSheet[sprite].spriteOffset[1] - frame.pos[1]*2)+2, HI)
          }
        }
      } else {
        WS = Math.max(Math.abs(gameSheet[sprite].spriteSize[0]/2-gameSheet[sprite].spriteOffset[0]), WS)
        WI = Math.max(Math.abs(gameSheet[sprite].spriteSize[0]/2+gameSheet[sprite].spriteOffset[0]), WI)
        HS = Math.max(Math.abs(gameSheet[sprite].spriteSize[1]/2+gameSheet[sprite].spriteOffset[1]), HS)
        HI = Math.max(Math.abs(gameSheet[sprite].spriteSize[1]/2-gameSheet[sprite].spriteOffset[1]), HI)  
      }
    }
  }

  return { sprites, WS, WI, HS, HI}
}
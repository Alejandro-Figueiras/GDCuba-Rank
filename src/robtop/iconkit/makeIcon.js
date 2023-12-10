'use server'

import Jimp from 'jimp';
import { getIconSprites } from './getIconSprites';
import gameSheet from './gameSheet.json'
import colors from './colors.json'
import { getLayer } from './getLayer';

export const makeIcon = async({type, iconNumber, c1, c2, glow, hostURL}) => {
  const {sprites, WS, WI, HS, HI} = getIconSprites({type, iconNumber})
  const fullImage = new Jimp(WS+WI, HS+HI)

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
    const url = `${hostURL}/assets/iconkit/${path}`
    
    const spriteOffset = gameSheet[path].spriteOffset
    const spriteSize = gameSheet[path].spriteSize
    const layer = await getLayer({url, path, color})
    fullImage.composite(
      layer, 
      WS - spriteSize[0]/2 + spriteOffset[0],
      HS - spriteSize[1]/2 - spriteOffset[1]
    )
  }

  return await fullImage.getBase64Async(Jimp.MIME_PNG)
}
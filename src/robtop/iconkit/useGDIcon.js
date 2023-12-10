import gameSheet from './gameSheet.json'
import colors from './colors.json'
import { getLayer } from './getLayer';
import { useEffect, useRef } from 'react';
import debounce from 'just-debounce-it'
import { getIconSprites } from './getIconSprites';

export const useGDIcon = ({
  type, iconNumber, c1, c2, glow
}) => {
  const printCanvas = useRef()
  const finalImage = useRef()

  const {sprites, WS, WI, HS, HI } = getIconSprites({type, iconNumber})
  console.log(WS, WI, HS, HI, "finalmente", WS+WI, HS+HI)
  
  // truco maluco para optimizar XDDD
  const updateImageSrc = debounce(() => {
    const data = printCanvas.current.toDataURL();
    finalImage.current.src = data;
  }, 100);

  // Coloring sprites
  useEffect(() => {
    const ctx = printCanvas.current.getContext(`2d`)
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
      const currentUrl = window.location.href;
      const hostURL = currentUrl.split("/").slice(0,3).join("/")
      const url = `${hostURL}/assets/iconkit/${path}`
      
      const spriteOffset = gameSheet[path].spriteOffset
      const spriteSize = gameSheet[path].spriteSize
      getLayer({url, path, color}).then(layer => {
        const img = document.createElement('img')
        img.src = layer
        ctx.drawImage(
          img, 
          WS - spriteSize[0]/2 + spriteOffset[0],
          HS - spriteSize[1]/2 - spriteOffset[1]
        )
        updateImageSrc() // <- Función debounce
      })
    }
  }, [])

  return {printCanvas, finalImage, WS, WI, HS, HI}
}
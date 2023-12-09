"use server"

import Jimp from "jimp";
import iconData from './iconData.json'
const gameSheet = iconData.gameSheet;
import colors from './colors.json'

export const getLayer = ({url, path, color = null}) => {
  return new Promise((resolve, reject) => {
    Jimp.read({url}, (err, image) => {
      if (err) console.log(err);
      if (gameSheet[path].textureRotated) image.rotate(90); // Verificar
      if (color) image.color([
        {apply: 'red', params: [-255+color.r]},
        {apply: 'green', params: [-255+color.g]},
        {apply: 'blue', params: [-255+color.b]}
      ])
      image.getBase64Async(Jimp.MIME_PNG)
        .then(layer => resolve(layer))
        .catch(err => reject)
      
    })
  })
}
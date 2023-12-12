"use server"

import Jimp from "jimp";
import gameSheet from './gameSheet.json'

export const getLayer = async({url, path, color = null, rotate = null, scale = [1,1]}) => {
  if (!scale) scale=[1,1]
  const image = await Jimp.read(url);
  if (gameSheet[path].textureRotated) image.rotate(90);
  image.resize(image.getWidth() * scale[0], image.getHeight() * scale[1])
  if (rotate) {
    image.scale(8)
    image.rotate(rotate)
    image.scale(0.125)
  }
  
  if (color) image.color([
    {apply: 'red', params: [-255+color.r]},
    {apply: 'green', params: [-255+color.g]},
    {apply: 'blue', params: [-255+color.b]}
  ])
  
  return image;
}
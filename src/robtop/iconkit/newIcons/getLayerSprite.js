'use client'

import { Sprite } from "pixi.js";

const intToHex = (c) => {
  const hex = c.toString(16);
  return hex.length == 1 ? '0'+ hex : hex;
}

export const getLayerSprite = async({texture, info = {}, color = null, rotate = null, scale = [1,1]}) => {
  // if (!scale) scale=[1,1]
  // image.resize(image.getWidth() * scale[0], image.getHeight() * scale[1])

  const sprite = new Sprite(texture);
  sprite.rotation = 
  (info.textureRotated) ? 90 : 0 + 
  (rotate) ? rotate : 0;
  if (color) sprite.tint = '#'+intToHex(color.r)+intToHex(color.g)+intToHex(color.b)
  
  return sprite;
}
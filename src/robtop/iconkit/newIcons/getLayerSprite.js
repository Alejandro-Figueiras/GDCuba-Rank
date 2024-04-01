'use client'

import { Sprite } from "pixi.js";

const intToHex = (c) => {
  const hex = c.toString(16);
  return hex.length == 1 ? '0'+ hex : hex;
}

export const getLayerSprite = async({texture, info = {}, color = null, rotate = null, scaleX = 1, scaleY = 1}) => {
  // TODO si es necesario
  // image.resize(image.getWidth() * scale[0], image.getHeight() * scale[1])
  
  const sprite = new Sprite(texture);
  sprite.angle = 
  ((info.textureRotated) ? -90 : 0) +
  ((rotate) ? rotate : 0);

  if (info.textureRotated) {
    const temp = scaleX;
    scaleX = scaleY;
    scaleY = temp;
  }
  sprite.scale.x = scaleX
  sprite.scale.y = scaleY
  if (color) sprite.tint = '#'+intToHex(color.r)+intToHex(color.g)+intToHex(color.b)
  
  return sprite;
}
'use client'

import { Sprite, type Texture } from 'pixi.js'

const intToHex = (c: number) => {
  const hex = c.toString(16)
  return hex.length == 1 ? '0' + hex : hex
}

export const getLayerSprite = async ({
  texture,
  textureRotated = false,
  color,
  rotate,
  scaleX = 1,
  scaleY = 1
}: {
  texture: Texture
  textureRotated: boolean
  color?: {
    r: number
    g: number
    b: number
  }
  rotate?: number
  scaleX?: number
  scaleY?: number
}) => {
  const sprite = new Sprite(texture)
  sprite.angle = (textureRotated ? -90 : 0) + (rotate ? rotate : 0)

  if (textureRotated) {
    const temp = scaleX
    scaleX = scaleY
    scaleY = temp
  }
  sprite.scale.x = scaleX
  sprite.scale.y = scaleY
  if (color)
    sprite.tint =
      '#' + intToHex(color.r) + intToHex(color.g) + intToHex(color.b)

  return sprite
}

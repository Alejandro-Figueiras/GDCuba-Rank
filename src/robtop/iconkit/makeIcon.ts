import { getIconTextures } from './getIconTextures'
import { getLayerSprite } from './getLayerSprite'
import colorsJSON from './colors.json'
import robotInfo from './robotInfo.json'
import spiderInfo from './spiderInfo.json'
import { Application, Container, Sprite, Texture } from 'pixi.js'
import DictionaryObject from '@/helpers/DictionaryObject'
import { IconTypes } from './Icons'

type ColorType = { r: number; g: number; b: number }
const colors = colorsJSON as {
  [key: number]: ColorType
}

type SpritesToPrint = {
  path: string
  sprite: Sprite
  x: number
  y: number
}[]

const icon22 = {
  cube: 484,
  ship: 169,
  ball: 118,
  ufo: 149,
  wave: 96,
  robot: 68,
  spider: 69,
  swing: 43,
  jetpack: 5,
  colors: 106
}

const layerPriority = {
  glow: 1,
  3: 2, // capsula del ufo
  2: 3,
  '001.png': 4,
  extra: 5
} as DictionaryObject<number>

const printSprites = async (spritesToPrint: SpritesToPrint) => {
  const mainSprite = new Container({})
  for (const { sprite, x, y } of spritesToPrint) {
    mainSprite.addChild(sprite)
    sprite.anchor.set(0.5)
    sprite.x = x
    sprite.y = y
  }

  const bounds = mainSprite.getBounds()
  mainSprite.x -= bounds.x
  mainSprite.y -= bounds.y

  const app = new Application()
  await app.init({
    backgroundAlpha: 0,
    width: Math.ceil(mainSprite.width),
    height: Math.ceil(mainSprite.height)
  })
  app.renderer.render(mainSprite)
  const data = app.canvas.toDataURL()
  const img = (' ' + data).slice(1)
  app.destroy(true, true)
  mainSprite.destroy()
  return img
}

export const makeIcon = ({
  type,
  iconNumber,
  c1,
  c2,
  c3,
  glow,
  hostURL
}: {
  type: IconTypes
  iconNumber: number
  c1: number
  c2: number
  c3: number
  glow: number | boolean
  hostURL: string
}): Promise<string> => {
  if (iconNumber > icon22[type]) {
    iconNumber = 1
  }
  if (c1 > icon22.colors) {
    c1 = 0
  }
  if (c2 > icon22.colors) {
    c2 = 5
  }
  if (c3 > icon22.colors) {
    c3 = 12
  }

  return new Promise(async (resolve) => {
    const { textures, spritesInfo, layerNames } = await getIconTextures({
      type,
      iconNumber,
      hostURL
    })

    const spritesToPrint: SpritesToPrint = []

    const makeSprites = async ({
      texture,
      layerName,
      rotate,
      offsetX = 0,
      offsetY = 0,
      scaleX = 1,
      scaleY = 1
    }: {
      texture: Texture
      layerName: string[]
      rotate?: number
      offsetX?: number
      offsetY?: number
      scaleX?: number
      scaleY?: number
    }) => {
      let color: ColorType | undefined

      const spriteLayer = ['robot', 'spider'].includes(layerName[0])
        ? layerName[3]
        : layerName[2]
      if (spriteLayer == '001.png') {
        color = colors[c1]
      } else if (spriteLayer == '2') {
        color = colors[c2]
      } else if (spriteLayer == 'glow') {
        if (!glow) return
        color = colors[c3]
      }

      const path = layerName.join('_')
      const spriteOffset = spritesInfo[path].spriteOffset
      const sprite = await getLayerSprite({
        texture,
        textureRotated: spritesInfo[path].textureRotated,
        color,
        rotate,
        scaleX,
        scaleY
      })
      texture.destroy()
      spritesToPrint.push({
        path,
        sprite,
        x: 0 + spriteOffset[0] + offsetX,
        y: 0 - spriteOffset[1] - offsetY
      })
    }

    layerNames.sort((a, b) => {
      const aP =
        layerPriority[a[['robot', 'spider'].includes(type) ? 3 : 2]] | 8
      const bP =
        layerPriority[b[['robot', 'spider'].includes(type) ? 3 : 2]] | 8
      return aP - bP
    })

    if (type == 'robot' || type == 'spider') {
      for (const frame of type == 'robot' ? robotInfo : spiderInfo) {
        for (const layerName of layerNames) {
          if (parseInt(layerName[2]) == frame.part)
            await makeSprites({
              texture: textures[layerName.join('_')],
              layerName,
              rotate: frame.rotation,
              offsetX: frame.pos[0] * 4,
              offsetY: frame.pos[1] * 4,
              scaleX: (frame.flipped[0] ? -1 : 1) * frame.scale[1],
              scaleY: (frame.flipped[1] ? -1 : 1) * frame.scale[0]
            })
        }
      }
    } else {
      // demas iconos
      for (const layerName of layerNames) {
        await makeSprites({
          texture: textures[layerName.join('_')],
          layerName
        })
      }
    }

    const data = await printSprites(spritesToPrint)
    for (const { sprite } of spritesToPrint) {
      sprite.destroy()
    }
    resolve(data.toString())
  })
}

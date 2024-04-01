import { getIconTextures } from "./getIconTextures"
import { getLayerSprite } from "./getLayerSprite"
import colors from '../colors.json'
import robotInfo from '../robotInfo.json'
import spiderInfo from '../spiderInfo.json'
import { Application, Container } from "pixi.js"

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
  colors: 106,
}

const layerPriority = {
  'glow': 1,
  '3': 2, // capsula del ufo
  '2': 3,
  '001.png': 4,
  'extra': 5
}

const printSprites = async(spritesToPrint) => {
  const mainSprite = new Container();
  for (const {sprite, x, y} of spritesToPrint) {
    mainSprite.addChild(sprite)
    sprite.anchor.set(0.5)
    sprite.x = x
    sprite.y = y
  }
  console.log(mainSprite.width, mainSprite.height)
  const app = new Application();
  await app.init({
    background: "#222222",
    width: Math.ceil(mainSprite.width),
    height: Math.ceil(mainSprite.height)
  })
  for (const {sprite, x, y} of spritesToPrint) {
    sprite.x = app.screen.width / 2 + x
    sprite.y = app.screen.height / 2 + y
  }
  app.stage.addChild(mainSprite)
  app.render()
  return app.canvas.toDataURL()
}

export const makeIcon = async({type, iconNumber, c1, c2, c3, glow, hostURL}) => {
  if (iconNumber>icon22[type]) {iconNumber=1};
  if (c1>icon22.colors) {c1=0};
  if (c2>icon22.colors) {c2=5};
  if (c3>icon22.colors) {c3=12};

  const { textures, spritesInfo, layerNames } = await getIconTextures({
    type,
    iconNumber,
    hostURL
  })

  const spritesToPrint = []

  const makeSprites = async({texture, layerName, rotate = null, offsetX = 0, offsetY = 0, scale = null}) => {
    let color = null;
  
    const spriteLayer = (['robot', 'spider'].includes(layerName[0]))
    ? layerName[3]
    : layerName[2]
    if (spriteLayer=='001.png') {
      color = colors[c1];
    } else if (spriteLayer=='2') {
      color = colors[c2];
    } else if (spriteLayer == 'glow') {
      if (!glow) return;
      color = colors[c3];
    }

    const path = layerName.join('_');
    const spriteOffset = spritesInfo[path].spriteOffset
    const sprite = await getLayerSprite({texture, info: spritesInfo[path], color, rotate, scale})
    spritesToPrint.push({
      path,
      sprite, 
      x: 0 + spriteOffset[0] + offsetX,
      y: 0 - spriteOffset[1] - offsetY,
    })
  }

  layerNames.sort((a,b) => {
    const aP = layerPriority[a[(['robot', 'spider'].includes(type))?3:2]] | 8;
    const bP = layerPriority[b[(['robot', 'spider'].includes(type))?3:2]] | 8;
    return aP - bP; 
  })

  if (type == "robot" || type == "spider") {
    for (const frame of (type == "robot") ? robotInfo : spiderInfo) {
      for (const layerName of layerNames) {
        if (parseInt(layerName[2]) == frame.part)
          await makeSprites({
            texture: textures[layerName.join('_')],
            layerName, 
            rotate: frame.rotation,
            offsetX: frame.pos[0]*4,
            offsetY: frame.pos[1]*4,
            scale: frame.scale
          })
      }
    }
  } else { // demas iconos
    for (const layerName of layerNames) {
      await makeSprites({
        texture: textures[layerName.join('_')],
        layerName
      })
    }
  }

  return await printSprites(spritesToPrint);
}
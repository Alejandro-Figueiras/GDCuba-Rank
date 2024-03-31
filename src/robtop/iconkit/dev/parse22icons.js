import fs from 'fs'
import plist from 'plist'

const parseWeirdArray = (data) => {
  return data.replace(/[^0-9,-]/g, "").split(",").map(x => +x)
}

const logic = async() => {
  const folder = fs.readdirSync('./icons');
  // filtrar iconos
  for (const icon of folder) {
    const parts = icon.split('.')

    if (parts[1] == 'plist') {
      const array = parts[0].split('-');
      if (array[1] == 'uhd') {

        // Parse plist
        const archivo = plist.parse(fs.readFileSync('./icons/'+icon, 'utf8')).frames
        const info = {};

        for (const frameName of Object.keys(archivo)) {
          info[frameName] = {};
          for (const keyName of Object.keys(archivo[frameName])) {
            let keyData = archivo[frameName][keyName]
            if (["spriteOffset", "spriteSize", "spriteSourceSize"].includes(keyName)) {
                info[frameName][keyName] = parseWeirdArray(keyData)
            }
        
            else if (keyName == "textureRotated") {
              const isRotated = keyData
              info[frameName][keyName] = isRotated
            }
        
            else if (keyName == "textureRect") {
              info[frameName].textureRect = {
                pos: [],
                size: []
              };
              let textureArr = keyData.slice(1, -1).split("},{").map(x => parseWeirdArray(x))
              info[frameName].textureRect.pos = textureArr[0]
              info[frameName].textureRect.size = textureArr[1]
            }  
          }  
        }

        // Move texture
        fs.renameSync("./icons/"+parts[0]+'.png', './gdicons/'+parts[0]+'.png')
        fs.writeFileSync('./gdicons/'+parts[0]+'.json', JSON.stringify(info));
      }
    }
  }

}

logic();









// let iconData = {
//     gameSheet: {}
// }


const parsePlist = () => {
    let iconFrames = obj.frames
    let positionData = {}

    for (const frameName of Object.keys(iconFrames)) {
        let frameData = iconFrames[frameName];
        console.log(frameData)
        let isRotated = false
        iconData.gameSheet[frameName] = {}
        positionData[frameName] = {}

        for (const keyName of Object.keys(frameData)) {
            let keyData = frameData[keyName]
            
            if (["spriteOffset", "spriteSize", "spriteSourceSize"].includes(keyName)) {
                iconData.gameSheet[frameName][keyName] = parseWeirdArray(keyData)
            }
        
            else if (keyName == "textureRotated") {
                isRotated = keyData
                iconData.gameSheet[frameName][keyName] = isRotated
            }
        
            else if (keyName == "textureRect") {
                let textureArr = keyData.slice(1, -1).split("},{").map(x => parseWeirdArray(x))
                positionData[frameName].pos = textureArr[0]
                positionData[frameName].size = textureArr[1]
            }  
        }

        if (isRotated) positionData[frameName].size.reverse()
    }
    
    return positionData
}


// const positionData = parsePlist();
// fs.writeFileSync("./uhd3.json", JSON.stringify(iconData));
// (async()=>{
//     for (const key of Object.keys(positionData)) {
//         const {pos, size} = positionData[key]
//         await sharp(spriteSheetPath).extract({
//             width: size[0],
//             height: size[1],
//             top: pos[1],
//             left: pos[0]
//         }).toFile(`./uhd3/${key}`)
//         console.log(`success ${key}`)
//     }
// })()
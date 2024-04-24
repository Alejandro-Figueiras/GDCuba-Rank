// This is an independent dev script

// First: npm i sharp plist
// Then:  node parseRobTopResources
import fs from 'fs'
import plist from 'plist'
import sharp from 'sharp';

const plistPath = 'GJ_GameSheet02-uhd.plist'
const spriteSheetPath = "./GJ_GameSheet02-uhd.png"

var obj = plist.parse(fs.readFileSync(plistPath, 'utf8'));

let iconData = {
    gameSheet: {}
}
const parseWeirdArray = (data) => {
    return data.replace(/[^0-9,-]/g, "").split(",").map(x => +x)
}

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

fs.writeFileSync("./iconData.json", JSON.stringify(iconData));

const positionData = parsePlist();
(async()=>{
    for (const key of Object.keys(positionData)) {
        const {pos, size} = positionData[key]
        await sharp(spriteSheetPath).extract({
            width: size[0],
            height: size[1],
            top: pos[1],
            left: pos[0]
        }).toFile(`./iconkit/${key}`)
        console.log(`success ${key}`)
    }
})()


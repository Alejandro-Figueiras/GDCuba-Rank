const fs = require('fs');
const iconData = JSON.parse(fs.readFileSync("../iconData.json", { encoding: 'utf-8'}));
console.log(iconData)
const gameSheet = {}

const types = [
  'player',
  'bird',
  'dart',
  'robot',
  'spider',
  'ship',
  'player_ball' // cae dentro de player
]

for (const sprite of Object.keys(iconData.gameSheet)) {
  const parts = sprite.split('_')
  if (types.includes(parts[0])) {
    gameSheet[sprite] = iconData.gameSheet[sprite];
    console.log(`Se queda: ${sprite}`)
  } else {
    if (fs.existsSync("../../../../public/assets/iconkit/"+sprite))
      fs.rmSync("../../../../public/assets/iconkit/"+sprite);
    console.log(`Se va: ${sprite}`)
  }
}

fs.writeFileSync('../gameSheet.json', JSON.stringify(gameSheet))
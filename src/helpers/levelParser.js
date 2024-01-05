
export const parseDifficulty = (level) => {
  console.log(level.difficultydenominator)
  const difficulty = (level.difficultydenominator)?level.difficultynumerator/level.difficultydenominator:"N/A"
  const featured = 
    (level.epic == 3) ? 'Mythic' :
    (level.epic == 2) ? 'Legendary' :
    (level.epic == 1) ? 'Epic' :
    (level.featurescore) ? 'Featured'
    :'none'

  const difficultyName = 
    (level.auto) ? 'Auto' :
    (level.demon)?(
      (level.demondifficulty == 3) ? "Easy Demon" :
      (level.demondifficulty == 4) ? "Medium Demon" :
      (level.demondifficulty == 5) ? "Insane Demon" :
      (level.demondifficulty == 6) ? "Extreme Demon" :
      'Hard Demon'
    ):(
      (level.difficulty == 0) ? "Unrated" :
      (level.difficulty == 1) ? "Easy" :
      (level.difficulty == 2) ? "Normal" :
      (level.difficulty == 3) ? "Hard" :
      (level.difficulty == 4) ? "Harder" :
      (level.difficulty == 5) ? "Insane" :
      'N/A'
    )

  return {
    difficulty: (level.demon)?'demon':difficulty,
    difficultyName,
    demon: level.demon,
    demondiff: level.demondifficulty,
    featured
  }
}

export const getDifficultyPath = () => {
  return "Todavía"
}
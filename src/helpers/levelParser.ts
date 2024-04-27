import Level from "@/models/Level"

// TODO implementar record
export const parseDifficulty = (level: Level) => {
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
      (difficulty == 0) ? "N/A" :
      (difficulty == 1) ? "Easy" :
      (difficulty == 2) ? "Normal" :
      (difficulty == 3) ? "Hard" :
      (difficulty == 4) ? "Harder" :
      (difficulty == 5) ? "Insane" :
      'N/A'
    )

  return {
    difficulty: (level.demon)?'demon':difficulty,
    difficultyName,
    difficultyNumber: getDifficultyNumber({difficulty, demon: level.demon, demondifficulty: level.demondifficulty}),
    demon: level.demon,
    demondiff: level.demondifficulty,
    featured,
    path: getDifficultyPath({featured, difficultyName})
  }
}

type DifficultyPathParams = {
  featured: string,
  difficultyName: string
}
export const getDifficultyPath = ({featured, difficultyName}: DifficultyPathParams) => {
  if (difficultyName == 'N/A') return '/assets/dificultades/na.png'
  return `/assets/dificultades/${featured.toLowerCase()}/${difficultyName.replace(' ', '_').toLowerCase()}.png`
}

type DifficultyNumberParams = {
  difficulty: number | "N/A"
  demondifficulty?: number
  demon?: boolean
}
export const getDifficultyNumber = ({difficulty = 0, demondifficulty = 3, demon = false}: DifficultyNumberParams) => {
  if (demon) {
    return (demondifficulty == 3) ? 11 : // Easy Demon
    (demondifficulty == 4) ? 12 : // Medium Demon
    (demondifficulty == 5) ? 14 : // Insane Demon
    (demondifficulty == 6) ? 15 : // Extreme Demon
    13 //Hard Demon
  }
  if (difficulty == 'N/A') return 0;
  return difficulty
}

export const getDifficultyNameByNumber = (n: number) => {
  return (n == 0) ? "N/A" :
  (n == 1) ? "Easy" :
  (n == 2) ? "Normal" :
  (n == 3) ? "Hard" :
  (n == 4) ? "Harder" :
  (n == 5) ? "Insane" :
  (n == 11) ? "Easy Demon" :
  (n == 12) ? "Medium Demon" :
  (n == 13) ? 'Hard Demon' :
  (n == 14) ? "Insane Demon" :
  (n == 15) ? "Extreme Demon" :
  'N/A'
}

export const getLengthName = ({length = 3, noPlatformer = false}) => {
  return (length==0) ? 'Tiny' :
    (length==1) ? 'Short' :
    (length==2) ? 'Medium' :
    (length==3) ? 'Long' :
    (length==4) ? 'XL' :
    (noPlatformer) ? '' : 'Platformer'
}
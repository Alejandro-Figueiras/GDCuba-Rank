import { getLengthName, parseDifficulty } from '@/helpers/levelParser'
import {
  Card,
  CardBody,
  Image,
  Button,
} from '@nextui-org/react'

const LevelCardTiny = ({level, hover=false}) => {
  const dificultad = parseDifficulty(level)
  return (
    <div className="flex justify-center">
    <Card
      isBlurred
      className={`
      bg-background/60 border-solid border-3 border-divider dark:bg-default-100/50 
      w-max overflow-hidden
      ${hover?'hover:bg-primary-50':''}`}
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-12 gap-4 items-center justify-center">
          <div className="relative col-span-2 flex justify-center">
            <Image
              alt="Difficulty"
              className="object-cover"
              src={dificultad.path}
              width={(dificultad.featured=='none')?40:50}
            />
          </div>

          <div className="flex flex-col col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">

                <div className="">
                  <h1 className="font-medium mt-2">
                    <span className="text-xl">{level.levelname}</span>
                    <span className="text-lg ml-2 text-foreground/70">by {level.author}</span>
                  </h1>
                  <h3 className="font-medium ">
                    
                  </h3>
                </div>
                <p className="text-small text-foreground/80 flex gap-2">
                  <span className="flex">
                    <img 
                      src={`/assets/stats/${(level.platformer?'moons':'stars')}Icon${level.stars?'':'BN'}.png`} 
                      alt="Stars" style={{height: '18px'}}
                    />
                    {level.stars == 0 ? 'Unrated' : level.stars}
                  </span>
                  <span className="flex">
                    <img 
                      src={`/assets/stats/${(level.verifiedcoins)?'user':'bronze'}coin.png`} 
                      alt="Coins" style={{height: '18px'}}
                      className="mr-1"
                    />
                    {level.coins}
                  </span> 
                  <span>
                    {level.platformer?'Plataforma':'Tradicional'}
                  </span>
                  {level.platformer ? '' :
                    <span className="flex">
                      <img src="/assets/levelIcons/length.png" style={{height: '18px', marginRight: '4px'}}/>
                      {getLengthName({length: level.length, noPlatformer: true})}
                    </span>
                  }
                </p>
                
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
    </div>
  )
}

export default LevelCardTiny
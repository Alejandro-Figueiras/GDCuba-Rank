import { getLengthName, parseDifficulty } from '@/helpers/levelParser'
import {
  Card,
  CardBody,
  Image,
  Button,
} from '@nextui-org/react'

const LevelCard = ({level}) => {
  // TODO unverified levels
  const dificultad = parseDifficulty(level)
  return (
    <Card
      isBlurred
      className="bg-background/60 border-solid border-1 border-gray-50 dark:bg-default-100/50 max-w-[400px]"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-6 md:col-span-4">
            <Image
              alt="Difficulty"
              className="object-cover"
              shadow="md"
              src={dificultad.path}
              width={100}
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <h1 className="text-xl font-medium mt-2">{level.levelname}</h1>
                <h3 className="font-medium text-foreground/90">
                  <span>{level.author}</span>
                </h3>
                <p className="text-small text-foreground/80 flex gap-2">
                  <span className="flex">
                    <img 
                      src={`/assets/stats/${(level.platformer?'moons':'stars')}Icon.png`} 
                      alt="Stars" style={{height: '18px'}}
                    />
                    {level.stars}
                  </span>
                  <span className="flex">
                    <img 
                      src={`/assets/stats/usercoin.png`} 
                      alt="Coins" style={{height: '18px'}}
                      className="mr-1"
                    />
                    {level.coins}
                  </span> 
                  <span>
                    {level.platformer?'Plataforma':'Tradicional'}
                  </span>
                  {level.platformer ? '' :
                    <span>
                      {getLengthName({length: level.length, noPlatformer: true})}
                    </span>
                  }
                </p>
                <p className="text-small text-foreground/80 flex gap-2">
                  <span>{level.downloads}</span>
                  <span>{level.likes}</span>
                  <span>#{level.id}</span></p>
              </div>
              
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default LevelCard
import { getLengthName, parseDifficulty } from '@/helpers/levelParser'
import type Level from '@/models/Level'
import { Card, CardBody, Image } from '@nextui-org/react'

const LevelCardTiny = ({
  level,
  hover = false
}: {
  level: Level
  hover?: boolean
}) => {
  const dificultad = parseDifficulty(level)
  return (
    <Card
      isBlurred
      className={`
      w-full overflow-hidden border-3 border-solid border-divider 
      bg-background/60 dark:bg-default-100/50
      ${hover ? 'hover:bg-primary-50' : ''}`}
      shadow='sm'
    >
      <CardBody>
        <div className='flex flex-row items-center justify-start gap-4'>
          <div className='relative flex min-w-14 justify-center'>
            <Image
              alt='Difficulty'
              className='object-cover'
              src={dificultad.path}
              width={dificultad.featured == 'none' ? 40 : 50}
            />
          </div>

          <div className='col-span-8 flex flex-col'>
            <div className='flex items-start justify-between'>
              <div className='flex flex-col gap-0'>
                <div className=' '>
                  <h1 className='mt-2 flex flex-row flex-wrap font-medium'>
                    <span className='text-xl '>{level.levelname}</span>
                    <span className='ml-2 text-nowrap text-lg text-foreground/70'>
                      by {level.author}
                    </span>
                  </h1>
                  <h3 className='font-medium '></h3>
                </div>
                <p className='flex gap-2 text-small text-foreground/80'>
                  <span className='flex'>
                    <img
                      src={`/assets/stats/${level.platformer ? 'moons' : 'stars'}Icon${level.stars ? '' : 'BN'}.png`}
                      alt='Stars'
                      style={{ height: '18px' }}
                    />
                    {level.stars == 0 ? 'Unrated' : level.stars}
                  </span>
                  <span className='flex'>
                    <img
                      src={`/assets/stats/${level.verifiedcoins ? 'user' : 'bronze'}coin.png`}
                      alt='Coins'
                      style={{ height: '18px' }}
                      className='mr-1'
                    />
                    {level.coins}
                  </span>
                  <span>
                    {level.platformer ? (
                      'Plataforma'
                    ) : (
                      <span className='flex'>
                        <img
                          src='/assets/levelIcons/length.png'
                          style={{ height: '18px', marginRight: '4px' }}
                          alt=''
                        />
                        {getLengthName({
                          length: level.length,
                          noPlatformer: true
                        })}
                      </span>
                    )}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default LevelCardTiny

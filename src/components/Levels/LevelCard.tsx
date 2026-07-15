import { getLengthName, parseDifficulty } from '@/helpers/levelParser'
import type Level from '@/models/Level'
import { Card } from '@heroui/react'

const LevelCard = ({
  level,
  hover = false
}: {
  level: Level
  hover?: boolean
}) => {
  const dificultad = parseDifficulty(level)
  return (
    <div className='flex justify-center'>
      {/* <Card
        isBlurred
        className={`
      w-[400px] overflow-hidden border-3 border-solid border-divider 
      bg-background/60 dark:bg-default-100/50
      ${hover ? 'hover:bg-primary-50' : ''}`}
        shadow='sm'
      >
        <CardBody> */}
      <Card
        className={`border-divider bg-background/60 dark:bg-default-100/50 w-full overflow-hidden border-3 border-solid ${hover && 'transition hover:cursor-pointer hover:border-white/10 hover:bg-[#001731]'}`}
      >
        <Card.Content>
          <div className='grid grid-cols-12 items-center justify-center gap-4'>
            <div className='relative col-span-4 flex justify-center'>
              <img
                alt='Difficulty'
                className='object-cover'
                src={dificultad.path}
                width={dificultad.featured == 'none' ? 80 : 100}
              />
            </div>

            <div className='col-span-8 flex flex-col'>
              <div className='flex items-start justify-between'>
                <div className='flex flex-col gap-0'>
                  <h1 className='text-foreground mt-2 text-xl font-medium'>
                    {level.levelname}
                  </h1>
                  <h3 className='text-foreground/90 font-medium'>
                    <span>{level.author}</span>
                  </h3>
                  <p className='text-small text-foreground/80 flex flex-wrap'>
                    <span className='mr-2 flex'>
                      <img
                        src={`/assets/stats/${level.platformer ? 'moons' : 'stars'}Icon${level.stars ? '' : 'BN'}.png`}
                        alt='Stars'
                        style={{ height: '18px' }}
                      />
                      {level.stars == 0 ? 'Unrated' : level.stars}
                    </span>
                    <span className='mr-2 flex'>
                      <img
                        src={`/assets/stats/${level.verifiedcoins ? 'user' : 'bronze'}coin.png`}
                        alt='Coins'
                        style={{ height: '18px' }}
                        className='mr-1'
                      />
                      {level.coins}
                    </span>
                    <span className='mr-2'>
                      {level.platformer ? 'Plataforma' : 'Tradicional'}
                    </span>
                    {level.platformer ? (
                      ''
                    ) : (
                      <span className='mr-2 flex'>
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
                    <span className='mr-2 flex'>
                      <img
                        src='/assets/levelIcons/downloads.png'
                        style={{ height: '18px' }}
                        alt='D'
                      />
                      {level.downloads}
                    </span>
                    <span className='mr-2 flex'>
                      <img
                        src='/assets/levelIcons/likes.png'
                        style={{ height: '18px' }}
                        alt='L'
                      />
                      {level.likes}
                    </span>
                    <span>#{level.id}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card.Content>
      </Card>
    </div>
  )
}

export default LevelCard

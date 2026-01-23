import { useGDIconRef } from '@/robtop/iconkit/useGDIcon'
import { Card, CardBody, Spinner } from '@heroui/react'
import { useEffect, useState } from 'react'

import { type IconTypes } from '@/robtop/iconkit/Icons'
import { Account } from '@/models/Account'

const AccountIcon = ({
  type = 'cube' as IconTypes,
  iconNumber = 1,
  c1 = 0,
  c2 = 5,
  c3 = 12,
  glow = false,
  className = ''
}) => {
  const { icon } = useGDIconRef({
    type,
    iconNumber,
    c1,
    c2,
    c3,
    glow
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
  }, [icon])

  const sizeClass =
    type == 'robot'
      ? 'h-12'
      : type == 'wave'
        ? 'h-7'
        : type == 'ufo'
          ? 'h-9'
          : type == 'ship'
            ? 'max-h-8 min-w-12'
            : 'h-10'

  return (
    <div className={`flex flex-row justify-center ${className}`}>
      <div className='flex h-10 min-w-10 flex-col justify-center'>
        {loading && <Spinner color='danger' />}
        <img
          ref={icon}
          alt='Icon'
          className={`${sizeClass} w-100 ${loading ? 'hidden' : ''}`}
          onLoad={() => setLoading(false)}
        />
      </div>
    </div>
  )
}

const AccountIconsRow = ({ user }: { user: Account }) => {
  const [jetpack, setJetpack] = useState(false)

  const rowsClassnames = 'flex flex-row justify-evenly gap-6 align-middle'

  const comunProps = {
    c1: user.playercolor,
    c2: user.playercolor2,
    c3: user.playercolor3,
    glow: !!user.accglow
  }

  return (
    <Card className='bg-default-200 w-full max-w-full overflow-visible'>
      <CardBody className='p-4'>
        <div className={rowsClassnames}>
          <AccountIcon type='cube' iconNumber={user.accicon} {...comunProps} />
          <a
            href='#'
            onClick={() => setJetpack((v) => !v)}
            className='flex min-w-11 flex-row justify-center duration-75 active:scale-125'
          >
            <AccountIcon
              type={'jetpack'}
              iconNumber={user.accjetpack}
              {...comunProps}
              className={!jetpack ? '' : 'hidden'}
            />
            <AccountIcon
              type={'ship'}
              iconNumber={user.accship}
              {...comunProps}
              className={jetpack ? '' : 'hidden'}
            />
          </a>
          <AccountIcon
            type={'ball'}
            iconNumber={user.accball}
            {...comunProps}
          />
          <AccountIcon type={'ufo'} iconNumber={user.accbird} {...comunProps} />
          <AccountIcon
            type={'wave'}
            iconNumber={user.accwave}
            {...comunProps}
            className='max-[450px]:hidden'
          />
          <AccountIcon
            type={'robot'}
            iconNumber={user.accrobot}
            {...comunProps}
            className='max-[710px]:hidden'
          />
          <AccountIcon
            type={'spider'}
            iconNumber={user.accspider}
            {...comunProps}
            className='max-[710px]:hidden'
          />
          <AccountIcon
            type={'swing'}
            iconNumber={user.accswing}
            {...comunProps}
            className='max-[710px]:hidden'
          />
        </div>

        <div
          className={`${rowsClassnames} mt-4 hidden justify-center gap-6 max-[710px]:flex`}
        >
          <AccountIcon
            type={'wave'}
            iconNumber={user.accwave}
            {...comunProps}
            className='hidden max-[450px]:block'
          />
          <AccountIcon
            type={'robot'}
            iconNumber={user.accrobot}
            {...comunProps}
          />
          <AccountIcon
            type={'spider'}
            iconNumber={user.accspider}
            {...comunProps}
          />
          <AccountIcon
            type={'swing'}
            iconNumber={user.accswing}
            {...comunProps}
          />
        </div>
      </CardBody>
    </Card>
  )
}

export default AccountIconsRow

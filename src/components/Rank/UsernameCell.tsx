'use client'

import { type Account } from '@/models/Account'
import { useGDIconRef } from '@/robtop/iconkit/useGDIcon'

const UsernameCell = ({ player }: { player: Account }) => {
  const { icon } = useGDIconRef({
    type: 'cube',
    iconNumber: player.accicon,
    c1: player.playercolor,
    c2: player.playercolor2,
    c3: player.playercolor3,
    glow: !!player.accglow
  })
  return (
    <span className='flex gap-4'>
      <img ref={icon} className='h-6' alt='' />
      {player.username}
    </span>
  )
}

export default UsernameCell

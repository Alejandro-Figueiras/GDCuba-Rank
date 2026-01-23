import { type Account } from '@/models/Account'

const AccountStat = ({
  value,
  icon,
  className = ''
}: {
  value: string | number
  icon: string
  className?: string
}) => {
  return (
    <div
      className={`relative flex items-center justify-center gap-1 ${className}`}
    >
      <span className='flex h-7 w-7 items-center justify-center'>
        {icon ? <img src={icon} className='top-0 left-0 w-100' alt='' /> : 'ic'}
      </span>
      <span>{value}</span>
    </div>
  )
}

const AccountStatsRow = ({ user }: { user: Account }) => {
  return (
    <div className='min-h-20 w-full max-w-full min-[721px]:min-h-8'>
      <div className='flex justify-evenly gap-4 max-[720px]:justify-center'>
        <AccountStat value={user.stars} icon='/assets/stats/starsIcon.png' />
        <AccountStat value={user.moons} icon='/assets/stats/moonsIcon.png' />
        <AccountStat value={user.diamonds} icon='/assets/stats/diamond.png' />
        <AccountStat
          value={user.secretcoins}
          icon='/assets/stats/secretcoin.png'
        />
        <AccountStat
          value={user.usercoins}
          icon='/assets/stats/usercoin.png'
          className='max-[720px]:hidden'
        />
        <AccountStat
          value={user.demons}
          icon='/assets/dificultades/none/hard_demon.png'
          className='max-[720px]:hidden'
        />
        <AccountStat
          value={user.creatorpoints}
          icon='/assets/stats/creatorpoints.png'
          className='max-[720px]:hidden'
        />
      </div>
      <div className='hidden max-[720px]:mt-4 max-[720px]:flex max-[720px]:flex-row max-[720px]:justify-center max-[720px]:gap-8'>
        <AccountStat value={user.usercoins} icon='/assets/stats/usercoin.png' />
        <AccountStat
          value={user.demons}
          icon='/assets/dificultades/none/hard_demon.png'
        />
        <AccountStat
          value={user.creatorpoints}
          icon='/assets/stats/creatorpoints.png'
        />
      </div>
    </div>
  )
}

export default AccountStatsRow

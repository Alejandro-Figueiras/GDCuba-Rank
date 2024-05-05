import { type Account } from '@/models/Account'
import './AccountStatsRow.css'

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
        {icon ? <img src={icon} className='w-100 left-0 top-0' alt='' /> : 'ic'}
      </span>
      <span>{value}</span>
    </div>
  )
}

const AccountStatsRow = ({ user }: { user: Account }) => {
  return (
    <div className='min-h-20 w-full max-w-full min-[721px]:min-h-8'>
      <div className='user__stats-up-row flex justify-evenly gap-4'>
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
          className={'user__stats-down-hide'}
        />
        <AccountStat
          value={user.demons}
          icon='/assets/dificultades/none/hard_demon.png'
          className={'user__stats-down-hide'}
        />
        <AccountStat
          value={user.creatorpoints}
          icon='/assets/stats/creatorpoints.png'
          className={'user__stats-down-hide'}
        />
      </div>
      <div className='user__stats-down-row hidden'>
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

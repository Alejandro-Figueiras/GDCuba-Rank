import "./AccountStatsRow.css"

const AccountStat = ({ value, icon = null, className }) => {
  return (
    <div className={`flex gap-1 items-center justify-center relative ${className}`}>
      <span className="w-7 h-7 flex items-center justify-center">
        {icon ? (
          <img
            src={icon}
            className="w-100 top-0 left-0"
            alt=""
          />
        ) : (
          "ic"
        )}
      </span>
      <span>{value}</span>
    </div>
  );
}

const AccountStatsRow = ({user}) => {
  return (<div className="min-h-20 min-[721px]:min-h-8 w-full max-w-full">
    <div className="flex justify-evenly gap-4 user__stats-up-row">
      <AccountStat value={user.stars} icon="/assets/stats/starsIcon.png"/>
      <AccountStat value={user.moons} icon="/assets/stats/moonsIcon.png"/>
      <AccountStat value={user.diamonds} icon='/assets/stats/diamond.png'/>
      <AccountStat value={user.secretcoins} icon='/assets/stats/secretcoin.png'/>
      <AccountStat value={user.usercoins} icon='/assets/stats/usercoin.png' className={"user__stats-down-hide"}/>
      <AccountStat value={user.demons} icon='/assets/dificultades/none/hard_demon.png' className={"user__stats-down-hide"}/>
      <AccountStat value={user.creatorpoints} icon="/assets/stats/creatorpoints.png" className={"user__stats-down-hide"}/>
    </div>
    <div className="hidden user__stats-down-row">
      <AccountStat value={user.usercoins} icon='/assets/stats/usercoin.png'/>
      <AccountStat value={user.demons} icon='/assets/dificultades/none/hard_demon.png'/>
      <AccountStat value={user.creatorpoints} icon="/assets/stats/creatorpoints.png"/>
    </div>
  </div>)
}

export default AccountStatsRow
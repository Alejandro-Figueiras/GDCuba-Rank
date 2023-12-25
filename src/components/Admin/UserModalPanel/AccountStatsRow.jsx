const AccountStat = ({ value, icon = null }) => {
  return (
    <div className="flex gap-1 items-center justify-center relative">
      <span className="w-7 h-7 flex items-center justify-center">
        {icon ? (
          <img
            src={icon}
            className="w-100 top-0 left-0"
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
  return (<div className="min-h-8">
    <div className="flex justify-evenly gap-4 flex-wrap">
      <AccountStat value={user.stars} icon="/assets/stats/starsIcon.png"/>
      <AccountStat value={user.moons} icon="/assets/stats/moonsIcon.png"/>
      <AccountStat value={user.diamonds} icon='/assets/stats/diamond.png'/>
      <AccountStat value={user.secretcoins} icon='/assets/stats/secretcoin.png'/>
      <AccountStat value={user.usercoins} icon='/assets/stats/usercoin.png'/>
      <AccountStat value={user.demons} icon='/assets/dificultades/harddemon_icon.png'/>
      <AccountStat value={user.creatorpoints} icon="/assets/stats/creatorpoints.png"/>
    </div>
  </div>)
}

export default AccountStatsRow
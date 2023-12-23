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
      <AccountStat value={user.stars} icon="/img/starsIcon.png"/>
      <AccountStat value={user.moons} icon="/img/moonsIcon.png"/>
      <AccountStat value={user.diamonds} icon='/img/diamond.png'/>
      <AccountStat value={user.secretcoins} icon='/img/secretcoin.png'/>
      <AccountStat value={user.usercoins} icon='/img/coin.png'/>
      <AccountStat value={user.demons} icon='/img/demon.png'/>
      <AccountStat value={user.creatorpoints} icon="/img/cp.png"/>
    </div>
  </div>)
}

export default AccountStatsRow
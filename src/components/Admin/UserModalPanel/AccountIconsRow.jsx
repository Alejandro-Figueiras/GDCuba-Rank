import GDSpinner from "@/components/GDIcons/GDSpinner";
import { useGDIconRef } from "@/robtop/iconkit/useGDIcon";
import { Card, CardBody } from "@nextui-org/react";
import { useEffect, useState } from "react";

import './AccountIcons.css'

const AccountIcon = ({
  type = "cube",
  iconNumber = 1,
  c1 = 0,
  c2 = 5,
  c3 = 12,
  glow = false,
  effectDeps = [],
  className = ''

}) => {
  const { icon } = useGDIconRef({
    type,
    iconNumber,
    c1,
    c2,
    c3,
    glow,
    effectDeps,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, [icon]);

  const sizeClass = 
    (type == 'robot')? 'h-12' : 
    (type == 'wave')? 'h-7' : 
    (type == 'ufo')? 'h-9' : 
    (type == 'ship')? 'max-h-8 min-w-12' : 
    'h-10'

  return (
    <div className={`flex flex-row justify-center ${className}`}>
      <div className="h-10 min-w-10 flex flex-col justify-center">
        {loading && <GDSpinner className='h-8 w-8' />}
        <img
          ref={icon}
          alt="Icon"
          className={`${sizeClass} w-100 ${loading ? "hidden" : ''}`}
          onLoad={() => setLoading(false)}
        />
      </div>
    </div>
  );
};

const AccountIconsRow = ({ user }) => {
  const [jetpack, setJetpack] = useState(false)

  const rowsClassnames = "flex flex-row justify-evenly gap-6 flex-wrap align-middle"

  return (
    <Card className="bg-default-200 max-w-full w-full overflow-visible">
      <CardBody className="p-4">
        <div className={rowsClassnames}>
          <AccountIcon
            type={"cube"}
            iconNumber={user.accicon}
            c1={user.playercolor}
            c2={user.playercolor2}
            c3={user.playercolor3}
            glow={user.accglow}
            effectDeps={[user]}
          />
          <a href="#" onClick={() => setJetpack(v=>!v)} className="min-w-11 flex flex-row justify-center icons__ship">
              <AccountIcon
                type={"jetpack"}
                iconNumber={user.accjetpack}
                c1={user.playercolor}
                c2={user.playercolor2}
                c3={user.playercolor3}
                glow={user.accglow}
                effectDeps={[user]}
                className={(!jetpack)?'hidden':''}
              />
              <AccountIcon
                type={"ship"}
                iconNumber={user.accship}
                c1={user.playercolor}
                c2={user.playercolor2}
                c3={user.playercolor3}
                glow={user.accglow}
                effectDeps={[user]}
                className={(jetpack)?'hidden':''}
              />
          </a>
          <AccountIcon
            type={"ball"}
            iconNumber={user.accball}
            c1={user.playercolor}
            c2={user.playercolor2}
            c3={user.playercolor3}
            glow={user.accglow}
            effectDeps={[user]}
          />
          <AccountIcon
            type={"ufo"}
            iconNumber={user.accbird}
            c1={user.playercolor}
            c2={user.playercolor2}
            c3={user.playercolor3}
            glow={user.accglow}
            effectDeps={[user]}
          />
          <AccountIcon
            type={"wave"}
            iconNumber={user.accwave}
            c1={user.playercolor}
            c2={user.playercolor2}
            c3={user.playercolor3}
            glow={user.accglow}
            effectDeps={[user]}
            className="icons__4down-hide"
          />
          <AccountIcon
            type={"robot"}
            iconNumber={user.accrobot}
            c1={user.playercolor}
            c2={user.playercolor2}
            c3={user.playercolor3}
            glow={user.accglow}
            effectDeps={[user]}
            className="icons__3down-hide"
          />
          <AccountIcon
            type={"spider"}
            iconNumber={user.accspider}
            c1={user.playercolor}
            c2={user.playercolor2}
            c3={user.playercolor3}
            glow={user.accglow}
            effectDeps={[user]}
            className="icons__3down-hide"
          />
          <AccountIcon
            type={"swing"}
            iconNumber={user.accswing}
            c1={user.playercolor}
            c2={user.playercolor2}
            c3={user.playercolor3}
            glow={user.accglow}
            effectDeps={[user]}
            className="icons__3down-hide"
          />
        </div>

        <div className={`${rowsClassnames} gap-6 justify-center icons_down-row`}>
        <AccountIcon
            type={"wave"}
            iconNumber={user.accwave}
            c1={user.playercolor}
            c2={user.playercolor2}
            c3={user.playercolor3}
            glow={user.accglow}
            effectDeps={[user]}
            className="icons__4down-show"
          />
          <AccountIcon
            type={"robot"}
            iconNumber={user.accrobot}
            c1={user.playercolor}
            c2={user.playercolor2}
            c3={user.playercolor3}
            glow={user.accglow}
            effectDeps={[user]}
          />
          <AccountIcon
            type={"spider"}
            iconNumber={user.accspider}
            c1={user.playercolor}
            c2={user.playercolor2}
            c3={user.playercolor3}
            glow={user.accglow}
            effectDeps={[user]}
          />
          <AccountIcon
            type={"swing"}
            iconNumber={user.accswing}
            c1={user.playercolor}
            c2={user.playercolor2}
            c3={user.playercolor3}
            glow={user.accglow}
            effectDeps={[user]}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default AccountIconsRow;

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

  return (
    <div className="rounded-md">
      {loading && <GDSpinner className='h-8 w-8' />}
      <img
        ref={icon}
        alt="Icon"
        className={`h-10 ${loading && "hidden"}`}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};

const AccountIconsRow = ({ user }) => {
  const [jetpack, setJetpack] = useState(false)

  return (
    <Card className="bg-default-200 max-w-full w-full">
      <CardBody className="flex justify-evenly flex-row p-4 flex-wrap">
        <AccountIcon
          type={"cube"}
          iconNumber={user.accicon}
          c1={user.playercolor}
          c2={user.playercolor2}
          c3={user.playercolor3}
          glow={user.accglow}
          effectDeps={[user]}
        />
        <a href="#" onClick={() => setJetpack(v=>!v)} className="icons__ship">
          <AccountIcon
            type={(jetpack)? "jetpack" : "ship"}
            iconNumber={(jetpack) ? user.accjetpack : user.accship}
            c1={user.playercolor}
            c2={user.playercolor2}
            c3={user.playercolor3}
            glow={user.accglow}
            effectDeps={[user, jetpack]}
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
      </CardBody>
    </Card>
  );
};

export default AccountIconsRow;

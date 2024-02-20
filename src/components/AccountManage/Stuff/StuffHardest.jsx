'use client'

import { getHardestLevelsAction } from "@/actions/accounts/getHardestLevelsAction";
import StuffItemTitle from "./StuffItemTitle";
import { useEffect, useState } from "react";

const StuffHardest = ({itemData, id, handlers, manage = false, accStuff}) => {
  const [levels, setLevels] = useState([])
  // TODO loading error 

  useEffect(() => {
    getHardestLevelsAction(itemData.accountid).then(response => {
      setLevels(JSON.parse(response))
    })
  }, [])

  return <div className="flex flex-col my-2">
    <StuffItemTitle title='Hardest Levels' id={id} handlers={{...handlers}} manage={manage} accStuff={accStuff}/>
    <div>
      {levels.map(level => <p>{level.levelname}: {level.percent}</p>)}
    </div>
  </div>
}

export default StuffHardest;
'use client'

import { getHardestLevelsAction } from "@/actions/accounts/getHardestLevelsAction";
import StuffItemTitle from "./StuffItemTitle";
import { useEffect, useState } from "react";
import RecordCard from "@/components/Records/RecordCard";

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
    <div className="flex flex-row gap-2 justify-center flex-wrap mt-4">
      {levels.map(level => <RecordCard record={level} className="border-2 border-default" mini={true}/>)}
    </div>
  </div>
}

export default StuffHardest;
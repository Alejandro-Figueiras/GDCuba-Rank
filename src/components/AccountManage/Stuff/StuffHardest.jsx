'use client'

import { getHardestLevelsAction } from "@/actions/accounts/getHardestLevelsAction";
import StuffItemTitle from "./StuffItemTitle";
import { useEffect, useState } from "react";
import RecordCard from "@/components/Records/RecordCard";
import './StuffHardest.css'

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
    <div className="flex flex-row gap-2 justify-between flex-wrap mt-2 hardest-levels__sm-row">
      {levels.map((level, i) => <RecordCard key={i} record={level} className="border-2 border-default record-card__mini" mini={true}/>)}
    </div>
  </div>
}

export default StuffHardest;
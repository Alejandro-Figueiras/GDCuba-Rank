'use client'

import { getHardestLevelsAction } from "@/actions/accounts/getHardestLevelsAction";
import StuffItemTitle from "./StuffItemTitle";
import { useEffect, useState } from "react";
import RecordCard from "@/components/Records/RecordCard";
import './StuffHardest.css'
import LevelCardTiny from "@/components/Levels/LevelCardTiny";
import CreatedLevelCard from "@/components/Levels/CreatedLevelCard";

const StuffCreated = ({itemData, id, handlers, manage = false, accStuff}) => {

  return <div className="flex flex-col my-2">
    <StuffItemTitle title='Niveles Creados / Participaciones' id={id} handlers={{...handlers}} manage={manage} accStuff={accStuff}/>
    <div className="flex flex-row gap-2 justify-between flex-wrap mt-2 hardest-levels__sm-row">
      {itemData.levels.map((level, i) => <CreatedLevelCard key={i} level={level} className="border-2 border-default record-card__mini" mini={true}/>)}
    </div>
  </div>
}

export default StuffCreated;
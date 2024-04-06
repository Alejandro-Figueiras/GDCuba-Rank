'use client'

import { getHardestLevelsAction } from "@/actions/accounts/getHardestLevelsAction";
import StuffItemTitle from "./StuffItemTitle";
import { useEffect, useState } from "react";
import RecordCard from "@/components/Records/RecordCard";
import { Spinner } from '@nextui-org/react'
import './StuffHardest.css'

const StuffHardest = ({itemData, id, handlers, manage = false, accStuff}) => {
  const [levels, setLevels] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingError, setLoadingError] = useState('')

  useEffect(() => {
    setLoading(true)
    getHardestLevelsAction(itemData.accountid).then(response => {
      setLevels(JSON.parse(response))
    }).catch(err => {
      setLoadingError("Error al cargar los hardest")
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  return <div className="flex flex-col my-2">
    <StuffItemTitle title='Hardest Levels' id={id} handlers={{...handlers}} manage={manage} accStuff={accStuff}/>
    <div className="flex flex-row gap-2 justify-between flex-wrap mt-2 hardest-levels__sm-row">
      {levels.map((level, i) => <RecordCard key={i} record={level} className="border-2 border-default record-card__mini" mini={true}/>)}
    </div>
    {
      loadingError != '' && <div className="flex flex-col items-center mt-2">
        <img src="/assets/ui/delete.png" className="w-8"/>
        <p className="text-medium">{loadingError}</p>
      </div>
    }
    {
      loading && <div className="flex flex-col items-center mt-2">
      <Spinner />
      <p className="text-medium">Cargando...</p>
    </div>
    }
  </div>
}

export default StuffHardest;
"use client"
import { getAllCubansAction } from "@/actions/accounts/getAllCubansAction"
import { getAllInsaneDemonsVerifiedAction } from "@/actions/record/getAllInsaneDemons"
import ListLevelVictors from "@/components/Lists/ListLevelVictors"
import {useState, useEffect} from 'react'
import { Spinner } from '@nextui-org/react'

export default () => {
  const [players, setPlayers] = useState({})
  const [levels, setLevels] = useState([])
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingError, setLoadingError] = useState('')

  useEffect(() => {
    setLoading(true)
    getAllCubansAction().then(async(players) => {
      try {
        const newPlayers = JSON.parse(players)
        const playersObject = {};
        for (const player of newPlayers) {
          playersObject[player.accountid] = player
        }
        const records = JSON.parse(await getAllInsaneDemonsVerifiedAction())
        const newLevels = {};
        for (const record of records) {
          const level = {
            levelid: record.levelid,
            levelname: record.levelname,
            featured: record.featured,
            difficulty: record.difficulty,
            difficultyscore: record.difficultyscore
          }
          if (newLevels[level.levelname] == undefined) {
            newLevels[level.levelname] = level;
          }
        }
        const levels = Object.values(newLevels).sort((a,b) => {
          if (a.levelname < b.levelname) {
            return -1;
          }
          if (b.levelname < a.levelname) {
            return 1;
          }
          return 0;
        })
        setLevels(levels)
        setPlayers(playersObject)
        setRecords(records)
        setLoading(false)
      } catch(err) {
        console.log(err)
        setLoading(false)
        setLoadingError("Error al descargar los datos")
      }
    }).catch(err => {
      console.log(err)
      setLoading(false)
      setLoadingError("Error al descargar los datos")
    })
  }, [])

  const filterRecords = (levelid) => {
    return records.filter((val, i, array) => val.levelid == levelid)
  }

  return (
    <div className="container mx-auto my-4 max-w-3xl">
      <h1 className="text-2xl text-center my-4" key='title'><strong>Lista de Insane Demons</strong></h1>
      {(loading)
        ? (<div className="flex flex-col gap-2 mt-8 items-center">
          <Spinner/>
          <p className="text-center text-xl">Cargando datos...</p>
        </div>)
        :levels.map((level, i) => 
          <ListLevelVictors
            key={i}
            level={level}
            players={players}
            records={filterRecords(level.levelid)}
          />)
      }
      {
        (!loading && !loadingError && levels.length == 0) && 
          <p className="mt-2 text-medium text-center">No hay datos para mostrar</p>
      }
      {
        (!loading && loadingError) && 
        <div className="flex flex-col items-center mt-2">
          <img src="/assets/ui/delete.png" className="w-8"/>
          <p className="text-medium">{loadingError}</p>
        </div>
      }
    </div>
  )
}
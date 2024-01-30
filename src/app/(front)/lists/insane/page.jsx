"use client"
import { getAllCubansAction } from "@/actions/accounts/getAllCubansAction"
import { getAllExtremesVerifiedAction } from "@/actions/record/getAllExtremeDemons"
import { getAllInsaneDemonsVerifiedAction } from "@/actions/record/getAllInsaneDemons"
import ListLevelVictors from "@/components/Lists/ListLevelVictors"
import {useState, useEffect} from 'react'

export default () => {
  const [players, setPlayers] = useState({})
  const [levels, setLevels] = useState([])
  const [records, setRecords] = useState([])

  useEffect(() => {
    getAllCubansAction().then(async(players) => {
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
    })
  }, [])

  const filterRecords = (levelid) => {
    return records.filter((val, i, array) => val.levelid == levelid)
  }

  return (
    <>
      {(records.length==0)
        ? (<p className="text-center text-xl mt-8">Cargando datos...</p>)
        : (<div className="container mx-auto my-4 max-w-3xl">
          <h1 className="text-2xl text-center my-4" key='title'><strong>Lista de Insane Demons</strong></h1>
        {
          levels.map((level, i) => 
          <ListLevelVictors
            key={i}
            level={level}
            players={players}
            records={filterRecords(level.levelid)}
          />)
        }
      </div>)
      }
    </>
  )
}
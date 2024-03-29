"use client"
import { getAllCubansAction } from "@/actions/accounts/getAllCubansAction"
import { getAllExtremesVerifiedAction } from "@/actions/record/getAllExtremeDemons"
import ListLevelVictors from "@/components/Lists/ListLevelVictors"
import {useState, useEffect} from 'react'
import { Spinner } from '@nextui-org/react'

export default () => {
  const [players, setPlayers] = useState({})
  const [levels, setLevels] = useState([])
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getAllCubansAction().then(async(players) => {
      const newPlayers = JSON.parse(players)
      const playersObject = {};
      for (const player of newPlayers) {
        playersObject[player.accountid] = player
      }
      const records = JSON.parse(await getAllExtremesVerifiedAction())
      const newLevels = {};
      for (const record of records) {
        const level = {
          levelid: record.levelid,
          levelname: record.levelname,
          featured: record.featured,
          difficulty: record.difficulty,
          difficultyscore: record.difficultyscore
        }
        if (newLevels[level.levelid] == undefined) {
          newLevels[level.levelid] = level;
        }
      }
      const levels = Object.values(newLevels).sort((a,b) => b.difficultyscore - a.difficultyscore)
      setLevels(levels)
      setPlayers(playersObject)
      setRecords(records)
      setLoading(false)
    })
  }, [])

  const filterRecords = (levelid) => {
    return records.filter((val) => val.levelid == levelid)
  }

  return (
    <div className="container mx-auto my-4 max-w-3xl">
      <h1 className="text-2xl text-center my-4" key='title'><strong>Lista de Hardest</strong></h1>
      {(loading)
        ? (<div className="flex flex-col gap-2 mt-8 items-center">
          <Spinner/>
          <p className="text-center text-xl">Cargando datos...</p>
        </div>)
        : levels.map((level, i) => 
            <ListLevelVictors
              key={i}
              pos={i+1}
              level={level}
              players={players}
              records={filterRecords(level.levelid)}
            />)
      }
    </div>
  )
}

// TODO vacio
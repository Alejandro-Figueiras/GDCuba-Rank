"use client"
import { getAllCubansAction } from "@/actions/accounts/getAllCubansAction"
import { getAllExtremesVerifiedAction } from "@/actions/record/getAllExtremeDemons"
import RankTable from "@/components/Rank/RankTable"
import { getAllRecordsByDifficulty } from "@/database/db.records"
import {useState, useEffect} from 'react'

export default ({tipo = 'stars'}) => {
  const [rank, setRank] = useState([])

  useEffect(() => {
    getAllCubansAction().then(async(players) => {
      players = JSON.parse(players)
      if (tipo == 'extreme_demons') {
        const records = JSON.parse(await getAllExtremesVerifiedAction())
        const newPlayers = []
        for (const player of players) {
          player.verified_extreme_demons = records.filter((val, i, array) => val.accountid == player.accountid).length;
          if (player.verified_extreme_demons) newPlayers.push(player)
        }
        players = newPlayers
      }
      players.sort((a,b) => {
        if (tipo=='stars') {
          return b.stars-a.stars;
        } else if (tipo == 'demons') {
          return b.demons-a.demons;
        } else if (tipo == 'moons') {
          return b.moons-a.moons;
        } else if (tipo == 'usercoins') {
          return b.usercoins-a.usercoins;
        } else if (tipo == 'extreme_demons') {
          return b.verified_extreme_demons-a.verified_extreme_demons;
        }
        return b.stars-a.stars;
      })
      setRank(players)
    })
  }, [])

  return (
    <>
      {(rank.length==0)
        ? (<p className="text-center text-xl mt-8">Cargando datos...</p>)
        : (<div className="container mx-auto my-4 max-w-3xl">
        <RankTable ranking={rank} tipo={tipo}/>
      </div>)
      }
    </>
  )
}
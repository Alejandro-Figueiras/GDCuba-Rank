'use client'
import RankTable from "@/components/Rank/RankTable"
import { getAllCubans } from "@/database/db.gdaccounts"
import {useState, useEffect} from 'react'

export default () => {
  const [rank, setRank] = useState([])

  useEffect(() => {
    getAllCubans({toString: true}).then(players => {
      players = JSON.parse(players)
      players.sort((a,b) => {
        return b.stars-a.stars;
      })
      setRank(players)
    })
  }, [])

  return (
    <>
      {(rank.length==0)
        ? (<p>Cargando datos...</p>)
        : (<div className="container mx-auto my-4 max-w-3xl">
        <RankTable ranking={rank}/>
      </div>)
      }
    </>
  )
}
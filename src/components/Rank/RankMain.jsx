"use client"
import RankTable from "@/components/Rank/RankTable"
import { getAllCubans } from "@/database/db.gdaccounts"
import {useState, useEffect} from 'react'

export default ({tipo = 'stars'}) => {
  const [rank, setRank] = useState([])

  useEffect(() => {
    getAllCubans({toString: true}).then(players => {
      players = JSON.parse(players)
      players.sort((a,b) => {
        if (tipo=='stars') {
          return b.stars-a.stars;
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
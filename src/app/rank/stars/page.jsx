'use client'
import NavBar from "@/components/NavBar/NavBar"
import RankTable from "@/components/Rank/RankTable"
import { getStarsRank } from "@/database/cloud/db.functions"
import {useState, useEffect} from 'react'

export default () => {
  const [rank, setRank] = useState([])

  useEffect(() => {
    getStarsRank()
      .then((rows) => {
        if (rows)
          setRank(rows)
      })
    
  }, [])

  return (
    <>
      <NavBar/>
      {(rank.length==0)
        ? (<p>Cargando datos...</p>)
        : (<div className="container mx-auto my-4 max-w-2xl">
        <RankTable ranking={rank}/>
      </div>)
      }
    </>
  )
}
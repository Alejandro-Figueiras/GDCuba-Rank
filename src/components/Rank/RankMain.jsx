'use client'
import { getAllCubansAction } from '@/actions/accounts/getAllCubansAction'
import { getAllCubanExtremesVerifiedAction } from '@/actions/record/getAllExtremeDemons'
import RankTable from '@/components/Rank/RankTable'
import { useState, useEffect } from 'react'

const RankMain = ({ tipo = 'stars' }) => {
  const [rank, setRank] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getAllCubansAction().then(async (players) => {
      players = JSON.parse(players)
      if (tipo == 'extreme_demons') {
        const records = JSON.parse(await getAllCubanExtremesVerifiedAction())
        const newPlayers = []
        for (const player of players) {
          player.verified_extreme_demons = records.filter(
            (val, i, array) => val.accountid == player.accountid
          ).length
          if (player.verified_extreme_demons) newPlayers.push(player)
        }
        players = newPlayers
      }
      players = players
        .filter((value) => {
          if (
            ['stars', 'demons', 'usercoins', 'moons'].includes(tipo) &&
            value.globalrank == 0
          ) {
            return false
          }

          if (tipo == 'cp' && value.creatorpoints == 0) {
            return false
          }
          if (tipo == 'demons' && value.demons == 0) {
            return false
          }
          if (tipo == 'usercoins' && value.usercoins == 0) {
            return false
          }
          if (tipo == 'moons' && value.moons == 0) {
            return false
          }
          if (tipo == 'stars' && value.stars == 0) {
            return false
          }
          return true
        })
        .sort((a, b) => {
          if (tipo == 'stars') {
            return b.stars - a.stars
          } else if (tipo == 'demons') {
            return b.demons - a.demons
          } else if (tipo == 'moons') {
            return b.moons - a.moons
          } else if (tipo == 'usercoins') {
            return b.usercoins - a.usercoins
          } else if (tipo == 'extreme_demons') {
            return b.verified_extreme_demons - a.verified_extreme_demons
          } else if (tipo == 'cp') {
            return b.creatorpoints - a.creatorpoints
          }
          return b.stars - a.stars
        })
      setRank(players)
      setLoading(false)
    })
  }, [tipo])

  return (
    <div className='container mx-auto my-4 max-w-3xl'>
      <RankTable ranking={rank} tipo={tipo} loading={loading} />
    </div>
  )
}

export default RankMain

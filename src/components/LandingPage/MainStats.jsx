'use client'
import StatsCard from "./StatsCard"
import { useState, useEffect } from 'react'

const MainStats = ({}) => {
  const [landingStats, setLandingStats] = useState({
    totalStars: 0,
    totalDemons: 0,
    totalUsercoins: 0,
    totalCreatorPoints: 0,
    totalMoons: 0,
    hardest: {}
  });

  const cards = [
    {
      id: 'stars',
      title: "Total de Estrellas Acumuladas",
      value: landingStats.totalStars,
      img: '/assets/stats/starsIcon.png'
    },
    {
      id: 'demons',
      title: "Total de Demons Acumulados",
      value: landingStats.totalDemons,
      img: '/assets/dificultades/none/hard_demon.png'
    },
    {
      id: 'moons',
      title: "Total de Lunas Acumuladas",
      value: landingStats.totalMoons,
      img: '/assets/stats/moonsIcon.png'
    },
    {
      id: 'usercoins',
      title: "Total de Coins Acumuladas",
      value: landingStats.totalUsercoins,
      img: '/assets/stats/usercoin.png'
    },
    {
      id: 'cp',
      title: "Total de Creator Points Acumulados",
      value: landingStats.totalCreatorPoints,
      img: '/assets/stats/creatorpoints.png'
    },
  ]

  return <div class="container mx-auto my-12 flex justify-center flex-wrap gap-6 md:gap-10">
    {cards.map(card => {
      return <StatsCard {...card}/>
    })}
  </div>
}

export default MainStats
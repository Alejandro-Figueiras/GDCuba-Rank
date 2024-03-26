'use client'
import { getLandingStatsAction } from "@/actions/landing/getLandingStats";
import StatsCard from "./StatsCard"
import { useState, useEffect } from 'react'

const MainStats = ({}) => {
  const [landingStats, setLandingStats] = useState({
    totalStars: 'Cargando...',
    totalDemons: 'Cargando...',
    totalUsercoins: 'Cargando...',
    totalCreatorPoints: 'Cargando...',
    totalMoons: 'Cargando...',
    totalExtremes: 'Cargando...',
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
    {
      id: 'extremes',
      title: "Total de Extremes Acumulados",
      value: landingStats.totalExtremes,
      img: '/assets/dificultades/none/extreme_demon.png'
    },
    {
      id: 'hardest',
      title: "Hardest",
      value: landingStats.hardest.levelname,
      subtitle: `Completed by ${landingStats.hardest.username}`,
      img: '/assets/dificultades/epic/extreme_demon.png'
    },
  ]

  useEffect(() => {
    getLandingStatsAction().then((response) => {
      setLandingStats(JSON.parse(response))
    })
  }, [])

  return <div class="container mx-auto my-12 flex justify-center flex-wrap gap-6 md:gap-10">
    {cards.map((card, i) => {
      return <StatsCard {...card} key={i} />
    })}
  </div>
}

export default MainStats
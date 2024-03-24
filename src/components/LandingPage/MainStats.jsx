import StatsCard from "./StatsCard"

const MainStats = ({}) => {
  const cards = [
    {
      id: 'stars',
      title: "Total de Estrellas Acumuladas",
      value: "30000000",
      img: '/assets/stats/starsIcon.png'
    },
    {
      id: 'stars',
      title: "Total de Estrellas Acumuladas",
      value: "30000000",
      img: '/assets/stats/starsIcon.png'
    },
    {
      id: 'stars',
      title: "Total de Estrellas Acumuladas",
      value: "30000000",
      img: '/assets/stats/starsIcon.png'
    },
    {
      id: 'stars',
      title: "Total de Estrellas Acumuladas",
      value: "30000000",
      img: '/assets/stats/starsIcon.png'
    },
    {
      id: 'stars',
      title: "Total de Estrellas Acumuladas",
      value: "30000000",
      img: '/assets/stats/starsIcon.png'
    },
    {
      id: 'stars',
      title: "Total de Estrellas Acumuladas",
      value: "30000000",
      img: '/assets/stats/starsIcon.png'
    },
  ]

  return <div class="container mx-auto my-12 flex justify-center flex-wrap gap-10">
    {cards.map(card => {
      return <StatsCard {...card}/>
    })}
  </div>
}

export default MainStats
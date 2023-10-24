'use client'
import NavBar from "@/components/NavBar/NavBar"
import RankTable from "@/components/Rank/RankTable"


export default () => {
  const jugadores = {
    '123': {
      username: "SrMDK",
      stars: 1234,
      globalRank: 800
    },
    "124": {
      username: "Luciffer",
      stars: 5000,
      globalRank: 40
    }
  }

  const rank = [
    '124','123','124','123','124','123','124','123','124','123','124','123','124','123','124','123','124','123','124','123','124','123','124'
  ]
  return (
    <>
      <NavBar/>
      <div className="container mx-auto my-4 max-w-2xl">
        <RankTable jugadores={jugadores} ranking={rank}/>
      </div>
    </>
  )
}
'use client'
import { useGDIconRef } from "@/robtop/iconkit/useGDIcon";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/table";

const UsernameCell = ({ player }) => {
  const {icon} = useGDIconRef({
    type: 'cube',
    iconNumber: player.accicon,
    c1: player.playercolor,
    c2: player.playercolor2,
    c3: player.playercolor3,
    glow: player.accglow
  })
  return (<span className="flex gap-4"><img ref={icon} className="h-6"/>{player.username}</span>)
}

const calcularTrofeo = (globalrank) => {
  if (globalrank == 1) {
    return '/assets/trofeos/rankIcon_1_001.png'
  } else if (globalrank <=10) {
    return '/assets/trofeos/rankIcon_top10_001.png'
  } else if (globalrank <=50) {
    return '/assets/trofeos/rankIcon_top50_001.png'
  } else if (globalrank <=100) {
    return '/assets/trofeos/rankIcon_top100_001.png'
  } else if (globalrank <=200) {
    return '/assets/trofeos/rankIcon_top200_001.png'
  } else if (globalrank <=500) {
    return '/assets/trofeos/rankIcon_top500_001.png'
  } else if (globalrank <=1000) {
    return '/assets/trofeos/rankIcon_top1000_001.png'
  } else {
    return '/assets/trofeos/rankIcon_all_001.png'
  }
  
}

export default ({ ranking }) => {

  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader>
          <TableColumn width={40}>#</TableColumn>
          {/* <TableColumn width={30}></TableColumn> */}
          <TableColumn>Jugador</TableColumn>
          <TableColumn width={120}><span className="flex"><img src="/img/star.png" alt="Star" className="h-4 mr-1"/> Estrellas</span></TableColumn>
          <TableColumn width={120}><span className="flex align-middle"><img src='/assets/trofeos/rankIcon_1_001.png' alt="Star" className="h-4 mr-1"/> Global Rank</span></TableColumn>
      </TableHeader>
      <TableBody>
        {
          ranking.map((player, i) => 
            <TableRow key={i+1}>
              <TableCell>{i+1}</TableCell>
              <TableCell><UsernameCell player={player} /></TableCell>
              <TableCell><span className="flex align-middle"><img src="/img/star.png" alt="Star" className="h-4 mr-1"/> {player.stars}</span></TableCell>
              <TableCell><span className="flex align-middle"><img src={calcularTrofeo(player.globalrank)} alt="Star" className="h-4 mr-1"/> {player.globalrank}</span></TableCell>
            </TableRow>
          )
        }
      </TableBody>
    </Table>
  )
}
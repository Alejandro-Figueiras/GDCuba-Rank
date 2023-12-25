'use client'
import { calcularTrofeo } from "@/helpers/calcularTrofeoGR";
import { useUser } from "@/hooks/useUser";
import { Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell } from "@nextui-org/table";
import UsernameCell from "./UsernameCell";

export default ({ ranking, tipo = 'stars' }) => {
  const { openUserView } = useUser();

  const cols = [], cells = [];

  cols.push(<TableColumn width={40}>#</TableColumn>)
  cells.push((player, i) => <TableCell>{i+1}</TableCell>)

  cols.push(<TableColumn>Jugador</TableColumn>)
  cells.push((player, i) => <TableCell><UsernameCell player={player} /></TableCell>)

  if (tipo=='stars') {
    cols.push(<TableColumn width={120}><span className="flex"><img src="/assets/stats/starsIcon.png" alt="Star" className="h-4 mr-1"/> Estrellas</span></TableColumn>)
    cells.push((player, i) => <TableCell><span className="flex align-middle"><img src="/assets/stats/starsIcon.png" alt="Star" className="h-4 mr-1"/> {player.stars}</span></TableCell>)
    
    cols.push(<TableColumn width={120}><span className="flex align-middle"><img src='/assets/trofeos/rankIcon_1_001.png' alt="Star" className="h-4 mr-1"/> Global Rank</span></TableColumn>)
    cells.push((player, i) => <TableCell><span className="flex align-middle"><img src={calcularTrofeo(player.globalrank)} alt="Star" className="h-4 mr-1"/> {player.globalrank}</span></TableCell>)
  } else if (tipo=='demons') {
    cols.push(<TableColumn width={120}><span className="flex"><img src="/assets/dificultades/harddemon_icon.png" alt="Star" className="h-4 mr-1"/> Demons</span></TableColumn>)
    cells.push((player, i) => <TableCell><span className="flex align-middle"><img src="/assets/dificultades/harddemon_icon.png" alt="Star" className="h-4 mr-1"/> {player.demons}</span></TableCell>)
  }

  return (
    <Table aria-label="Example table with dynamic content" selectionMode="single">
      <TableHeader>
          {cols}
      </TableHeader>
      <TableBody>
        {
          ranking.map((player, i) => 
            <TableRow key={i+1} onClick={() => openUserView(player)}>
              {cells.map(cell => cell(player, i))}
            </TableRow>
          )
        }
      </TableBody>
    </Table>
  )
}
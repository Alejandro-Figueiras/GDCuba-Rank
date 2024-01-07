'use client'
import { calcularTrofeo } from "@/helpers/calcularTrofeoGR";
import { useUser } from "@/hooks/useUser";
import { Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell } from "@nextui-org/table";
import UsernameCell from "./UsernameCell";

export default ({ ranking, tipo = 'stars' }) => {
  const { openUserView } = useUser();

  const cols = [], cells = [];

  cols.push(<TableColumn width={40} key={'col_pos'}>#</TableColumn>)
  cells.push((player, i) => <TableCell key={`cell${i}_${player.username}_pos`}>{i+1}</TableCell>)

  cols.push(<TableColumn key={'col_name'}>Jugador</TableColumn>)
  cells.push((player, i) => <TableCell key={`cell${i}_${player.username}_name`}><UsernameCell player={player} /></TableCell>)

  if (tipo=='stars') {
    cols.push(<TableColumn width={120} key={'col_stars'}><span className="flex"><img src="/assets/stats/starsIcon.png" alt="Star" className="h-4 mr-1"/> Estrellas</span></TableColumn>)
    cells.push((player, i) => <TableCell key={`cell${i}_${player.username}_stars`}><span className="flex align-middle"><img src="/assets/stats/starsIcon.png" alt="Star" className="h-4 mr-1"/> {player.stars}</span></TableCell>)
    
    cols.push(<TableColumn width={120} key={'col_globalrank'}><span className="flex align-middle"><img src='/assets/trofeos/rankIcon_1_001.png' alt="Trofeo" className="h-4 mr-1"/> Global Rank</span></TableColumn>)
    cells.push((player, i) => <TableCell key={`cell${i}_${player.username}_globalrank`}><span className="flex align-middle"><img src={calcularTrofeo(player.globalrank)} alt="Trofeo" className="h-4 mr-1"/> {player.globalrank}</span></TableCell>)
  } else if (tipo=='demons') {
    cols.push(<TableColumn width={120} key={'col_demons'}><span className="flex"><img src="/assets/dificultades/none/hard_demon.png" alt="Demon" className="h-4 mr-1"/> Demons</span></TableColumn>)
    cells.push((player, i) => <TableCell key={`cell${i}_${player.username}_demons`}><span className="flex align-middle"><img src="/assets/dificultades/none/hard_demon.png" alt="Demon" className="h-4 mr-1"/> {player.demons}</span></TableCell>)
  } else if (tipo == 'moons') {
    cols.push(<TableColumn width={120} key={'col_moons'}><span className="flex"><img src="/assets/stats/moonsIcon.png" alt="Luna" className="h-4 mr-1"/> Lunas</span></TableColumn>)
    cells.push((player, i) => <TableCell key={`cell${i}_${player.username}_moons`}><span className="flex align-middle"><img src="/assets/stats/moonsIcon.png" alt="Luna" className="h-4 mr-1"/> {player.moons}</span></TableCell>)
  } else if (tipo == 'usercoins') {
    cols.push(<TableColumn width={120} key={'col_usercoin'}><span className="flex"><img src="/assets/stats/usercoin.png" alt="Coin" className="h-4 mr-1"/> User Coins</span></TableColumn>)
    cells.push((player, i) => <TableCell key={`cell${i}_${player.username}_usercoins`}><span className="flex align-middle"><img src="/assets/stats/usercoin.png" alt="Coin" className="h-4 mr-1"/> {player.usercoins}</span></TableCell>)
  } else if (tipo == 'cp') {
    cols.push(<TableColumn width={120} key={'col_cp'}><span className="flex"><img src="/assets/stats/creatorpoints.png" alt="CP" className="h-4 mr-1"/> Creator Points</span></TableColumn>)
    cells.push((player, i) => <TableCell key={`cell${i}_${player.username}_cp`}><span className="flex align-middle"><img src="/assets/stats/creatorpoints.png" alt="CP" className="h-4 mr-1"/> {player.creatorpoints}</span></TableCell>)
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
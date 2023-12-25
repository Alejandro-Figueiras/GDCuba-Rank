'use client'
import { calcularTrofeo } from "@/helpers/calcularTrofeoGR";
import { useUser } from "@/hooks/useUser";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/table";
import UsernameCell from "./UsernameCell";

export default ({ ranking, tipo = 'stars' }) => {
  const { openUserView } = useUser();
  return (
    <Table aria-label="Example table with dynamic content" selectionMode="single">
      <TableHeader>
          <TableColumn width={40}>#</TableColumn>
          {/* <TableColumn width={30}></TableColumn> */}
          <TableColumn>Jugador</TableColumn>
          {(tipo == "stars") && <TableColumn width={120}><span className="flex"><img src="/assets/stats/starsIcon.png" alt="Star" className="h-4 mr-1"/> Estrellas</span></TableColumn>}
          {(tipo == "stars") && <TableColumn width={120}><span className="flex align-middle"><img src='/assets/trofeos/rankIcon_1_001.png' alt="Star" className="h-4 mr-1"/> Global Rank</span></TableColumn>}
      </TableHeader>
      <TableBody>
        {
          ranking.map((player, i) => 
            <TableRow key={i+1} onClick={() => openUserView(player)}>
              <TableCell>{i+1}</TableCell>
              <TableCell><UsernameCell player={player} /></TableCell>
              {(tipo == "stars") && <TableCell><span className="flex align-middle"><img src="/assets/stats/starsIcon.png" alt="Star" className="h-4 mr-1"/> {player.stars}</span></TableCell>}
              {(tipo == "stars") && <TableCell><span className="flex align-middle"><img src={calcularTrofeo(player.globalrank)} alt="Star" className="h-4 mr-1"/> {player.globalrank}</span></TableCell>}
            </TableRow>
          )
        }
      </TableBody>
    </Table>
  )
}
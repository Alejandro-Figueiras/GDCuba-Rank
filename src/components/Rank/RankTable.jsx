'use client'
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/table";

export default ({ jugadores, ranking }) => {

  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader>
          <TableColumn width={40}>#</TableColumn>
          <TableColumn>Jugador</TableColumn>
          <TableColumn width={120}>⭐ Estrellas</TableColumn>
          <TableColumn width={120}>🏆 Global Rank</TableColumn>
      </TableHeader>
      <TableBody>
        {
          ranking.map((player, i) => 
            <TableRow key={i+1}>
              <TableCell>{i+1}</TableCell>
              <TableCell>{jugadores[player].username}</TableCell>
              <TableCell>⭐ {jugadores[player].stars}</TableCell>
              <TableCell>🏆 {jugadores[player].globalRank}</TableCell>
            </TableRow>
          )
        }
      </TableBody>
    </Table>
  )
}
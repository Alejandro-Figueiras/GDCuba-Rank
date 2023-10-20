"use client"
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/table";

export default ({usuarios}) => {
  
  return (
    <>
      <Table aria-label="Todos los usuarios">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Usuario</TableColumn>
          <TableColumn>Teléfono</TableColumn>
          <TableColumn>Estado</TableColumn>
        </TableHeader>
        <TableBody>
          {usuarios && usuarios.map((user, i) => (
            <TableRow key={i+1}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>Comming Soon</TableCell>
              <TableCell>Comming Soon</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

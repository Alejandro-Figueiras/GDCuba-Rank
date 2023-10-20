"use client"
import { Chip } from "@nextui-org/chip";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/table";

const renderRoleOrStatus = (arg) => {
  let color, texto;
  switch( arg ) {
    case "user":
      color = "default"
      texto = "Usuario"  
      break;
    case "v":
      color = "default"
      texto = "Verificado"
      break;
    case "u":
      color = "warning"
      texto = "No Verificado"
      break;
  }
  if (arg=="user") {
    color = "default"
    texto = "Usuario"
  } 
  return (
    <Chip
      size="sm"
      variant="flat"
      color={color}
    >
      <span className="capitalize text-xs">{texto}</span>
    </Chip>
  )
}

const renderStatus = (status) => {
  
}

export default ({usuarios}) => {
  
  return (
    <>
      <Table aria-label="Todos los usuarios">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Usuario</TableColumn>
          <TableColumn>Teléfono</TableColumn>
          <TableColumn>AccountID</TableColumn>
          <TableColumn>Rol</TableColumn>
          <TableColumn>Estado</TableColumn>
        </TableHeader>
        <TableBody>
          {usuarios && usuarios.map((user, i) => (
            <TableRow key={user.username}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.accountid}</TableCell>
              <TableCell>{renderRoleOrStatus(user.role)}</TableCell>
              <TableCell>{renderRoleOrStatus(user.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

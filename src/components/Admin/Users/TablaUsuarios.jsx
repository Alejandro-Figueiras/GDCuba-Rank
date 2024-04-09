"use client"
import { AdminContext } from "@/app/context/AdminContext";
import { Chip } from "@nextui-org/chip";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell, Link, Spinner } from "@nextui-org/react";
import { useContext } from "react";

const renderRoleOrStatus = (arg) => {
  let color, texto;
  switch( arg ) {
    case "user":
      color = "default"
      texto = "Usuario"  
      break;
    case "admin":
      color = "success"
      texto = "Admin"  
      break;
    case "v":
      color = "default"
      texto = "Verificado"
      break;
    case "u":
      color = "warning"
      texto = "No Verificado"
      break;
    case "b":
      color = "danger"
      texto = "Baneado"
      break;
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

export const getWhatsAppURL = (phone) => {
  return `http://wa.me/${phone}`
}

export default ({usuarios, updateData, loading = false}) => {
  const {openUserGestorFor} = useContext(AdminContext);
  return (
    <>
      <Table aria-label="Todos los usuarios" classNames={{table: loading?'min-h-[300px]':''}}>
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Usuario</TableColumn>
          <TableColumn>Teléfono</TableColumn>
          <TableColumn>AccountID</TableColumn>
          <TableColumn>Rol</TableColumn>
          <TableColumn>Estado</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={loading}
          loadingContent={<Spinner label="Cargando datos..." />}
          emptyContent={loading?null:"No hay usuarios para mostrar"}
        >
          {usuarios && usuarios.map((user, i) => (
            <TableRow key={user.id} className="cursor-pointer hover:bg-zinc-700 duration-75" onClick={() => openUserGestorFor(user, updateData)}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>
                <Link href={getWhatsAppURL(user.phone)} className="text-white underline" isExternal>
                  {user.phone}
                </Link>
              </TableCell>
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

"use client"
import { AdminContext } from "@/app/context/AdminContext";
import { getDifficultyNameByNumber, getDifficultyPath } from "@/helpers/levelParser";
import { 
  Table, 
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useState, useEffect } from "react";

export default ({records}) => {

  const AvalDropdown = ({record}) => {
    const [aval, setAval] = useState(record.aval)
    useEffect(()=> {
      console.log(aval)
    }, [aval])
    return (<Dropdown>
      <DropdownTrigger>
        <Button 
          variant="flat" 
          size="sm"
        >
          {aval}
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Aval Dropdown"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={aval}
        onSelectionChange={setAval}
      >
        <DropdownItem key="0">Sin verificar</DropdownItem>
        <DropdownItem key="1">Verificado</DropdownItem>
        <DropdownItem key="-1">Denegado</DropdownItem>
        <DropdownItem key="-2">Sin reverificar</DropdownItem>
      </DropdownMenu>
    </Dropdown>)
  }

  // const {openUserGestorFor} = useContext(AdminContext);
  return (
    <>
      <Table aria-label="Todos los records">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Usuario</TableColumn>
          <TableColumn>Nivel</TableColumn>
          <TableColumn>Porcentaje</TableColumn>
          <TableColumn>Aval</TableColumn>
        </TableHeader>
        <TableBody>
          {records && records.map((record, i) => (
            <TableRow key={record.id} className="cursor-pointer hover:bg-zinc-700 duration-75" onClick={() => {console.log(record.id)}}>
              <TableCell>{record.id}</TableCell>
              <TableCell>{record.username}</TableCell>
              <TableCell className="flex gap-2 align-middle">
                <img 
                  src={getDifficultyPath({
                    featured: record.featured, 
                    difficultyName: getDifficultyNameByNumber(record.difficulty)
                  })}
                  style={{height:"24px"}}
                />
                  
                {record.levelname}
              </TableCell>
              <TableCell>{record.percent}%</TableCell>
              <TableCell>
                {/* {record.aval} */}
                <AvalDropdown record={record} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}


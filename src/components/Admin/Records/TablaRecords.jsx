"use client"
import { getDifficultyNameByNumber, getDifficultyPath } from "@/helpers/levelParser";
import { 
  Table, 
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from "@nextui-org/react";
import RecordAvalDropdown from "./RecordAvalDropdown";

export default ({records}) => {

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
          {records && records.map((record) => (
            <TableRow key={record.id} className="cursor-pointer hover:bg-zinc-700 duration-75" onClick={() => {console.log(record.id)}}>
              <TableCell>{record.id}</TableCell>
              <TableCell>{record.username}</TableCell>
              <TableCell>
                <div className="flex gap-2 align-middle">
                  <img 
                    src={getDifficultyPath({
                      featured: record.featured, 
                      difficultyName: getDifficultyNameByNumber(record.difficulty)
                    })}
                    style={{height:"24px"}}
                  />
                    
                  {record.levelname}
                </div>
              </TableCell>
              <TableCell>{record.percent}%</TableCell>
              <TableCell>
                {/* {record.aval} */}
                <RecordAvalDropdown record={record} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}


'use client'

import { getDifficultyNameByNumber, getDifficultyPath } from "@/helpers/levelParser";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from "@nextui-org/react";
import UsernameCell from "../Rank/UsernameCell";

const ListLevelVictors = ({level, records, pos, players}) => {
  return (<Table removeWrapper aria-label={level.levelname} key={level.levelid} className="mb-8">
    <TableHeader>
      <TableColumn className="text-lg">
        <div className=" flex align-middle gap-2">
          <span className="text-white">{pos}.</span>
          <img 
            src={getDifficultyPath({
              featured: level.featured, 
              difficultyName: getDifficultyNameByNumber(level.difficulty)
            })}
            style={{
              height:"24px",
              filter: `grayscale(${(level.difficultyscore==0)?100:0}%)`
            }}
            />
          {level.levelname}
        </div>
        </TableColumn>
    </TableHeader>
    <TableBody>
      {records.map((record, i) =>
        <TableRow key={i} className="ml-2">
          <TableCell>
            <UsernameCell player={players[record.accountid]} />
            {record.video && "&#9658;"}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
  );
}

export default ListLevelVictors
'use client'

import { getDifficultyNameByNumber, getDifficultyPath } from "@/helpers/levelParser";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Link
} from "@nextui-org/react";
import UsernameCell from "../Rank/UsernameCell";
import YouTubeIcon from "../Icons/YouTubeIcon";

const ListLevelVictors = ({level, records, pos, players}) => {
  return (<Table removeWrapper aria-label={level.levelname} className="mb-8">
    <TableHeader>
      <TableColumn className="text-lg">
        <div className=" flex align-middle gap-2">
          {pos && <span className="text-white">{pos}.</span>}
          <img 
            src={getDifficultyPath({
              featured: level.featured, 
              difficultyName: getDifficultyNameByNumber(level.difficulty)
            })}
            style={{
              height:"24px",
              filter: `grayscale(${(level.difficulty == 15 && level.difficultyscore==0)?100:0}%)`
            }}
            />
          {level.levelname}
        </div>
        </TableColumn>
    </TableHeader>
    <TableBody>
      {records.map((record, i) =>
        <TableRow key={i} className="ml-2">
          <TableCell className="flex gap-3">
            <UsernameCell player={players[record.accountid]} />
            {record.video && <Link href={record.video} isExternal>
              <YouTubeIcon/>
            </Link>}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
  );
}

export default ListLevelVictors
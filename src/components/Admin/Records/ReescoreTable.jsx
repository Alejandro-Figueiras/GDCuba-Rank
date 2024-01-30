'use client'
import { getDifficultyNameByNumber, getDifficultyPath } from '@/helpers/levelParser';
import {
  Table, 
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from '@nextui-org/react'

const RescoreTable = ({levels}) => {
  return (<Table aria-label="Rescore Table">
      <TableHeader>
        <TableColumn>Score</TableColumn>
        <TableColumn>Nivel</TableColumn>
      </TableHeader>
      <TableBody>
        {levels && levels.map((level) => (
          <TableRow key={level.levelid}>
            <TableCell>{level.difficultyscore}</TableCell>
            <TableCell>
              <div className="flex gap-2 align-middle">
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
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>)
}

export default RescoreTable;
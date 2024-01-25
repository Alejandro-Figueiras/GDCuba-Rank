"use client"
import { getDifficultyNameByNumber, getDifficultyPath } from "@/helpers/levelParser";
import { 
  Table, 
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Chip,
  useDisclosure
} from "@nextui-org/react";
import { useState } from 'react'
import NivelesRescoreModal from "./NivelesRescoreModal";

export default ({levels: unsortedLevels}) => {
  const { isOpen, onOpen, onOpenChange} = useDisclosure()
  const [selectedLevel, setSelectedLevel] = useState({})

  const levels = [...unsortedLevels].sort((a,b)=> {
    if (a.difficultyscore == b.difficultyscore) return 0;
    if (a.difficultyscore == 0) return -1;
    if (b.difficultyscore == 0) return 1;
    return b.difficultyscore-a.difficultyscore;
  })

  const handleRescore = (level) => {
    setSelectedLevel(selectedLevel)
    onOpen();
  }

  return (
    <>
      <NivelesRescoreModal 
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        level={selectedLevel}
        setLevel={setSelectedLevel}
        levels={levels}
        />
      <Table aria-label="Todos los records">
        <TableHeader>
          <TableColumn>Nivel</TableColumn>
          <TableColumn>Score</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {levels && levels.map((level) => (
            <TableRow key={level.levelid}>
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
                  {!level.difficultyscore && <Chip size="sm" color="danger" variant="flat">
                    unscored  
                  </Chip>}
                </div>
              </TableCell>
              <TableCell>{level.difficultyscore}</TableCell>
              <TableCell>
                <Button 
                  size='sm'
                  color='default'
                  onClick={e=>handleRescore(level)}
                >Reposicionar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}


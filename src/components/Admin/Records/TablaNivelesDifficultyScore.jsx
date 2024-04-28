'use client'
import {
  getDifficultyNameByNumber,
  getDifficultyPath
} from '@/helpers/levelParser'
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Chip,
  Spinner,
  useDisclosure
} from '@nextui-org/react'
import { useState } from 'react'
import NivelesRescoreModal from './NivelesRescoreModal'

const TablaNivelesDifficultyScore = ({
  levels: unsortedLevels,
  handleRefresh,
  loading = false
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [selectedLevel, setSelectedLevel] = useState({})

  const levels = [...unsortedLevels].sort((a, b) => {
    if (a.difficultyscore == b.difficultyscore) return 0
    if (a.difficultyscore == 0) return -1
    if (b.difficultyscore == 0) return 1
    return b.difficultyscore - a.difficultyscore
  })

  const handleRescore = (level) => {
    setSelectedLevel(level)
    onOpen()
  }

  return (
    <>
      <NivelesRescoreModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        level={selectedLevel}
        setLevel={setSelectedLevel}
        levels={levels}
        handleRefresh={handleRefresh}
      />
      <Table
        aria-label='Todos los records'
        classNames={{ table: loading ? 'min-h-[300px]' : '' }}
      >
        <TableHeader>
          <TableColumn>Nivel</TableColumn>
          <TableColumn className='text-center'>Score</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={loading}
          loadingContent={<Spinner label='Cargando datos...' />}
          emptyContent={loading ? null : 'No hay niveles para mostrar'}
        >
          {levels &&
            levels.map((level) => (
              <TableRow key={level.levelid}>
                <TableCell>
                  <div className='flex gap-2 align-middle'>
                    <img
                      src={getDifficultyPath({
                        featured: level.featured,
                        difficultyName: getDifficultyNameByNumber(
                          level.difficulty
                        )
                      })}
                      style={{
                        height: '24px',
                        filter: `grayscale(${level.difficultyscore == 0 ? 100 : 0}%)`
                      }}
                      alt=''
                    />

                    {level.levelname}
                    {!level.difficultyscore && (
                      <Chip size='sm' color='danger' variant='flat'>
                        unscored
                      </Chip>
                    )}
                  </div>
                </TableCell>
                <TableCell className='text-center'>
                  {level.difficultyscore}
                </TableCell>
                <TableCell>
                  <Button
                    size='sm'
                    color='default'
                    onClick={(e) => handleRescore(level)}
                  >
                    Reposicionar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  )
}

export default TablaNivelesDifficultyScore

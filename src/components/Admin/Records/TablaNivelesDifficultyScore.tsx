'use client'
import {
  getDifficultyNameByNumber,
  getDifficultyPath
} from '@/helpers/levelParser'
import {
  Table,
  Button,
  Chip,
  Spinner,
  useOverlayState,
  EmptyState
} from '@heroui/react'
import { useState } from 'react'
import NivelesRescoreModal from './NivelesRescoreModal'
import { type RecordLevel } from '@/models/Record'

const TablaNivelesDifficultyScore = ({
  levels: unsortedLevels,
  handleRefresh,
  loading = false
}: {
  levels: RecordLevel[]
  handleRefresh?: () => void
  loading?: boolean
}) => {
  const { isOpen, setOpen } = useOverlayState()
  const [selectedLevel, setSelectedLevel] = useState({} as RecordLevel)

  const levels = [...unsortedLevels].sort((a, b) => {
    if (a.difficultyscore == b.difficultyscore) return 0
    if (a.difficultyscore == 0) return -1
    if (b.difficultyscore == 0) return 1
    return b.difficultyscore - a.difficultyscore
  })

  const handleRescore = (level: RecordLevel) => {
    setSelectedLevel(level)
    setOpen(true)
  }

  return (
    <>
      <NivelesRescoreModal
        isOpen={isOpen}
        setOpen={setOpen}
        level={selectedLevel}
        levels={levels}
        handleRefresh={handleRefresh}
      />
      <Table>
        <Table.ScrollContainer>
          <Table.Content
            className={loading ? 'min-h-75' : ''}
            aria-label='Niveles'
          >
            <Table.Header>
              <Table.Column isRowHeader>Nivel</Table.Column>
              <Table.Column className='text-center'>Score</Table.Column>
              <Table.Column>Acciones</Table.Column>
            </Table.Header>
            <Table.Body
              renderEmptyState={() => (
                <EmptyState className='flex h-full w-full flex-col items-center justify-center gap-4 text-center'>
                  {loading ? (
                    <>
                      <Spinner className='text-muted size-6' />
                      <span className='text-muted text-sm'>Cargando datos</span>
                    </>
                  ) : (
                    <span className='text-muted text-sm'>
                      No hay niveles para mostrar
                    </span>
                  )}
                </EmptyState>
              )}
            >
              {levels &&
                levels.map((level) => (
                  <Table.Row key={level.levelid}>
                    <Table.Cell>
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
                          <Chip color='danger'>unscored</Chip>
                        )}
                      </div>
                    </Table.Cell>
                    <Table.Cell className='text-center'>
                      {level.difficultyscore}
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        size='sm'
                        variant='secondary'
                        onPress={() => handleRescore(level)}
                      >
                        Reposicionar
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </>
  )
}

export default TablaNivelesDifficultyScore

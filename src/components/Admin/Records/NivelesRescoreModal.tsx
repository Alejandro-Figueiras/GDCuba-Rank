'use client'

import { useEffect, useState } from 'react'
import { Modal, Button, Spinner, NumberField, Label } from '@heroui/react'
import { reposicionarLevelAction } from '@/actions/admin/recordLevelsAction'
import { notify } from '@/libs/toastNotifications'
import RecordCard from '@/components/Records/RecordCard'
import { type RecordLevel } from '@/models/Record'

const NivelesRescoreModal = ({
  isOpen,
  setOpen,
  level,
  levels,
  handleRefresh
}: {
  isOpen: boolean
  setOpen: (isOpen: boolean) => void
  level: RecordLevel
  levels: RecordLevel[]
  handleRefresh?: () => void
}) => {
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [scoreRequested, setScoreRequested] = useState(level.difficultyscore)

  const clear = () => {
    setLoading(false)
    setDisabled(true)
    setScoreRequested(level.difficultyscore)
  }
  useEffect(clear, [isOpen, level.difficultyscore])

  const getMaxDifficultyScore = (levels: RecordLevel[]) => {
    return Math.max(...levels.map((level) => level.difficultyscore))
  }

  const handleSubmit = async () => {
    setLoading(true)

    const result = await reposicionarLevelAction({
      levelid: level.levelid,
      oldScore: level.difficultyscore,
      newScore: scoreRequested,
      platformer: !!level.platformer
    })
    if (result && result > 0) {
      notify(`Nivel reposicionado correctamente.`, 'success')
    } else {
      notify(`Error al actualizar nivel.`, 'error')
    }
    if (handleRefresh) handleRefresh()

    clear()
    setOpen(false)
  }

  useEffect(() => {
    if (
      scoreRequested < 1 ||
      scoreRequested == level.difficultyscore ||
      scoreRequested >
        getMaxDifficultyScore(levels) + (level.difficultyscore == 0 ? 1 : 0) ||
      !Number.isInteger(scoreRequested)
    ) {
      setDisabled(true)
    }
    if (
      scoreRequested >= 1 &&
      scoreRequested != level.difficultyscore &&
      scoreRequested <=
        getMaxDifficultyScore(levels) + (level.difficultyscore == 0 ? 1 : 0) &&
      Number.isInteger(scoreRequested)
    ) {
      setDisabled(false)
    }
  }, [scoreRequested, level.difficultyscore, levels])

  console.log(level)

  return (
    <Modal isOpen={isOpen} onOpenChange={setOpen}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Heading>Reposicionar nivel</Modal.Heading>
              <Modal.CloseTrigger />
            </Modal.Header>
            <Modal.Body>
              <NumberField
                name='name'
                value={scoreRequested}
                onChange={setScoreRequested}
                variant='secondary'
              >
                <Label>Score</Label>
                <NumberField.Group>
                  <NumberField.DecrementButton />
                  <NumberField.Input />
                  <NumberField.IncrementButton />
                </NumberField.Group>
              </NumberField>
              <div className='flex flex-row justify-center pt-2'>
                <RecordCard
                  record={{ ...level, aval: 1 }}
                  className='border-default-200 border'
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant='tertiary'
                onPress={() => {
                  clear()
                  setOpen(false)
                }}
              >
                Cerrar
              </Button>
              <Button
                onPress={() => {
                  handleSubmit()
                }}
                isPending={loading}
                isDisabled={disabled}
              >
                {loading && <Spinner color='current' size='sm' />}
                Adelante
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}

export default NivelesRescoreModal

'use client'

import {
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Button,
  Input
} from '@nextui-org/react'
import RescoreTable from './ReescoreTable'
import { reposicionarLevelAction } from '@/actions/admin/recordLevelsAction'
import { notify } from '@/libs/toastNotifications'

const NivelesRescoreModal = ({ isOpen, onOpenChange, level, levels, handleRefresh}) => {
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [scoreRequested, setScoreRequested] = useState(level.difficultyscore)

  const clear = () => {
    setLoading(false)
    setDisabled(true)
    setScoreRequested(level.difficultyscore)
  }

  const getMaxDifficultyScore = (levels) => {
    return Math.max(...levels.map(level => level.difficultyscore))
  }

  const handleSubmit = async(onClose) => {
    setLoading(true)

    const result = await reposicionarLevelAction({
      levelid: level.levelid,
      oldScore: level.difficultyscore,
      newScore: scoreRequested
    })
    if (result > 0) {
      notify(`Nivel reposicionado correctamente.`, 'success')
    } else {
      notify(`Error al actualizar nivel.`, 'error')
    }
    if (handleRefresh) handleRefresh()

    clear()
    onClose()
  }

  useEffect(() => {
    if (
      scoreRequested < 1 || 
      scoreRequested == level.difficultyscore ||
      scoreRequested > getMaxDifficultyScore(levels)+1
    ) {
      setDisabled(true)
    }
    if (
      scoreRequested >= 1 && 
      scoreRequested != level.difficultyscore &&
      scoreRequested <= getMaxDifficultyScore(levels)+1
    ) {
      setDisabled(false)
    }
  }, [scoreRequested])

  console.log(level)

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Reposicionar nivel
            </ModalHeader>
            <ModalBody>
              <Input 
                type='number'
                size='sm'
                min={1}
                max={getMaxDifficultyScore(levels)+1}
                defaultValue={level.difficultyscore}
                onValueChange={value => setScoreRequested(value)}
                label='Score'
                />
                {/* TODO fix this */}
              <RescoreTable levels={[level]} />

            </ModalBody>
            <ModalFooter>
              <Button
                color="default"
                variant="flat"
                onPress={() => {
                  clear()
                  onClose()
                }}
              >
                Cerrar
              </Button>
              <Button
                color="primary"
                onPress={() => {handleSubmit(onClose)}}
                isLoading={loading}
                isDisabled={disabled}
              >
                Adelante
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default NivelesRescoreModal;
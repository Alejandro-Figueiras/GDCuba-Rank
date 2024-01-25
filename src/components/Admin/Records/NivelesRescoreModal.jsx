'use client'

import {
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

const NivelesRescoreModal = ({ isOpen, onOpenChange, level, levels}) => {
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
    console.log(scoreRequested)
    if (scoreRequested == 0) return; // TODO effect
    setLoading(true)
    // Not today
    // await handleUpdate(itemData)

    clear()
    onClose()
  }

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
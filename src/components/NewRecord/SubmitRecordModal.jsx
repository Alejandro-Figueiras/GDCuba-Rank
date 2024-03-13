import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Slider
} from "@nextui-org/react";
import React, { useEffect, useState, useRef } from "react";
import SearchLevel from '@/components/NewRecord/SearchLevel'
import LevelCard from '@/components/Levels/LevelCard'
import { submitRecord } from '@/actions/record/submitRecord'
import SubmitResult from './SubmitResult'

export default function SubmitRecordModal({
  onOpenChange,
  isOpen,
}) {
  const [level, setLevel] = useState(null)
  const [submitResult, setSubmitResult] = useState(0)
  const sliderValue = useRef(100);
  const videoRef = useRef(null)

  // Submit
  const handleSubmit = async() => {
    const percent = sliderValue.current
    let  video = videoRef.current.value
    video.replace('m.youtube', 'www.youtube')
    if (!video.includes("youtube.com") || !video.includes("youtu.be")) video = ''

    const submitResult = await submitRecord({
      percent, video
    }, level)
    
    setSubmitResult(submitResult)
  }

  // ----- RESET -----
  useEffect(() => {
    if (isOpen) {
      setLevel(null)
      setSubmitResult(0)
    }
  }, [isOpen]);

  return (
    <Modal 
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      size={submitResult==0?"xl":'sm'}
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Nuevo Record</ModalHeader>
            <ModalBody>
              {(submitResult==0)?<div className="">
              <SearchLevel setNewLevel={setLevel} level={level}/>
              {level && <>
                <LevelCard level={level} />
                <div className='mt-2 flex flex-col gap-4'>
                  <Slider
                    color='success'
                    step={1}
                    onChange={value => {
                      sliderValue.current=value
                    }}
                    maxValue={100}
                    minValue={0}
                    defaultValue={100}
                    label="Porciento Completado"
                    className="max-w-md mx-auto"
                  />
                  <Input type="text" className="max-w-md mx-auto" size='lg' radius='sm' ref={videoRef} placeholder="YouTube Video URL (Opcional)"/>
                </div>
              </>}
            </div>:<SubmitResult submitResult={submitResult} />}
            </ModalBody>
            <ModalFooter>
              {submitResult==0 && <Button
                color="success"
                variant="flat"
                onPress={handleSubmit}
                isDisabled={!level}
              >
                Enviar Record
              </Button>}
              <Button color="default" variant="flat" onPress={onClose}>
                {submitResult==0 ? 'Cerrar' : 'Aceptar'}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
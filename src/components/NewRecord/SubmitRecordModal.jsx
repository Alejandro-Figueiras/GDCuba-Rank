import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { useEffect, useState, useRef } from "react";
import { SearchIcon } from "../Icons/SearchIcon";
import SearchLevel from '@/components/NewRecord/SearchLevel'
import LevelCard from '@/components/Levels/LevelCard'
import { submitRecord } from '@/actions/record/submitRecord'
import SubmitResult from './SubmitResult'

import { getLevelsFromGD } from "@/actions/levels/levels";

export default function SubmitRecordModal({
  onOpenChange,
  isOpen,
}) {
  const [level, setLevel] = useState(null)
  const [submitResult, setSubmitResult] = useState(0)
  const sliderValue = useRef(100);
  const videoRef = useRef(null)

  const handleSubmit = async() => {
    const percent = sliderValue.current
    const video = videoRef.current.value

    const submitResult = await submitRecord({
      percent, video
    }, level)
    
    setSubmitResult(submitResult)
  }

  // ----- RESET -----
  useEffect(() => {
    if (isOpen) {
      // TODO reset
    }
  }, [isOpen]);

  return (
    <Modal 
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      size="3xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Nuevo Record</ModalHeader>
            <ModalBody>
              <SearchLevel setNewLevel={setLevel} level={level}/>

              {(submitResult==0)?<div className="max-w-[900px] mx-auto mt-8">
              {level && <>
                <LevelCard level={level} />
                <div className='my-2'>
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
                    className="max-w-md"
                  />
                  {/* TODO verificar el video de YT */}
                  <Input type="text" ref={videoRef} placeholder="YouTube Video URL (Opcional)" size='sm'/>
                  <Button color="primary" onClick={handleSubmit}>Agregar Record</Button>
                  <Button>Eliminar</Button>
                </div>
              </>}
            </div>:<SubmitResult submitResult={submitResult} />}
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                variant="flat"
                onPress={async() => {
                  console.log("Buscando", modalData.value);
                  const data = JSON.parse(await getLevelsFromGD({data: "Yatagarasu"}));
                  console.log(data);
                }}
              >
                Aceptar
              </Button>
              <Button color="default" variant="flat" onPress={onClose}>
                Cancelar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

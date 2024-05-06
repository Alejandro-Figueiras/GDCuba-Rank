import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Slider,
  Select,
  SelectItem,
  Spinner,
  SelectSection
} from '@nextui-org/react'
import React, { useEffect, useState, useRef, MutableRefObject } from 'react'
import SearchLevel from '@/components/NewRecord/SearchLevel'
import LevelCard from '@/components/Levels/LevelCard'
import { submitRecord } from '@/actions/record/submitRecord'
import SubmitResult from './SubmitResult'
import { submitRecordAdminAction } from '@/actions/admin/submitRecordAdminAction'
import { getAllAccountsAction } from '@/actions/admin/getAllAccountsAction'
import { Account } from '@/models/Account'
import type Level from '@/models/Level'

export default function SubmitRecordModal({
  onOpenChange,
  isOpen,
  admin = false
}: {
  onOpenChange: () => void
  isOpen: boolean
  admin?: boolean
}) {
  const [level, setLevel] = useState(undefined as undefined | Level)
  const [submitResult, setSubmitResult] = useState(0)
  const [account, setAccount] = useState(undefined as Account | undefined) // Only admin
  const [accountList, setAccountList] = useState([] as Account[]) // Only admin
  const [loading, setLoading] = useState(false)
  const sliderValue = useRef(100)
  const videoRef = useRef() as MutableRefObject<HTMLInputElement>

  // Submit
  const handleSubmit = async () => {
    const percent = sliderValue.current
    let video = videoRef.current.value
    video.replace('m.youtube', 'www.youtube')
    if (!video.includes('youtube.com') && !video.includes('youtu.be'))
      video = ''

    if (!level) return -1
    setLoading(true)
    let submitResult
    if (admin) {
      if (!account) {
        setSubmitResult(-1)
        return
      }
      submitResult = await submitRecordAdminAction(
        {
          percent,
          video,
          accountid: account.accountid,
          username: account.username,
          cuba: account.cuba ? 1 : 0
        },
        level
      )
    } else {
      submitResult = await submitRecord(
        {
          percent,
          video
        },
        level
      )
    }

    setSubmitResult(submitResult)
    setLoading(false)
  }

  // Si es plataforma, poner 100% por default
  useEffect(() => {
    if (level && level.platformer) {
      sliderValue.current = 100
    }
  }, [level])

  // ----- RESET -----
  useEffect(() => {
    if (isOpen) {
      setLevel(undefined)
      setSubmitResult(0)
      setAccount(undefined)
      if (admin) {
        setLoading(true)
        getAllAccountsAction().then((accounts) => {
          if (!accounts) setSubmitResult(-1)
          setAccount(undefined)
          setAccountList(JSON.parse(accounts as string) as Account[])
          setLoading(false)
        })
      }
    }
  }, [isOpen, admin])

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      size={submitResult == 0 ? 'xl' : 'sm'}
      scrollBehavior='inside'
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Nuevo Record {admin && `(admin)`}</ModalHeader>
            <ModalBody>
              {loading ? (
                <div className='flex flex-col justify-center gap-4'>
                  <Spinner />
                  <p className='text text-center text-medium'>Cargando...</p>
                </div>
              ) : submitResult == 0 ? (
                <div className=''>
                  {admin && (
                    <Select
                      items={accountList}
                      label='Cuenta objetivo'
                      placeholder='Selecciona una cuenta'
                      className='mb-2'
                      onSelectionChange={(keys) => {
                        if (typeof keys == 'string') return

                        keys.forEach((value) => {
                          const accountid = parseInt(value as string)
                          if (accountid == account?.accountid)
                            setAccount(undefined)
                          else {
                            setAccount(
                              accountList.find((val) => {
                                return val.accountid == accountid
                              })
                            )
                          }
                        })
                      }}
                    >
                      {(account) => (
                        <SelectItem key={account.accountid}>
                          {account.username}
                        </SelectItem>
                      )}
                    </Select>
                  )}
                  <SearchLevel setNewLevel={setLevel} />
                  {level && (
                    <>
                      <LevelCard level={level} />
                      <div className='mt-2 flex flex-col gap-4'>
                        {level.platformer ? (
                          <span className='text-center'>
                            Los niveles del modo plataforma se tomarán como
                            totalmente completados al mandar el Record.
                            <br />
                            Si no has completado el nivel, <b>no lo envíes</b>.
                          </span>
                        ) : (
                          <Slider
                            color='success'
                            step={1}
                            onChange={(value) => {
                              sliderValue.current = value as number
                            }}
                            maxValue={100}
                            minValue={0}
                            defaultValue={100}
                            label='Porciento Completado'
                            className='mx-auto max-w-md'
                          />
                        )}
                        <Input
                          type='text'
                          className='mx-auto max-w-md'
                          size='lg'
                          radius='sm'
                          ref={videoRef}
                          placeholder='YouTube Video URL (Opcional)'
                        />
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <SubmitResult submitResult={submitResult} />
              )}
            </ModalBody>
            <ModalFooter>
              {submitResult == 0 && !loading && (
                <Button
                  color='success'
                  variant='flat'
                  onPress={handleSubmit}
                  isDisabled={!level || (admin && !account?.username)}
                >
                  Enviar Record
                </Button>
              )}
              <Button color='default' variant='flat' onPress={onClose}>
                {submitResult == 0 ? 'Cerrar' : 'Aceptar'}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

import {
  Button,
  Input,
  Modal,
  Slider,
  Select,
  Spinner,
  TextField,
  Label
} from '@heroui/react'
import React, { useEffect, useState } from 'react'
import SearchLevel from '@/components/NewRecord/SearchLevel'
// import LevelCard from '@/components/Levels/LevelCard'
import { submitRecord } from '@/actions/record/submitRecord'
import SubmitResult from './SubmitResult'
import { submitRecordAdminAction } from '@/actions/admin/submitRecordAdminAction'
import { getAllAccountsAction } from '@/actions/admin/getAllAccountsAction'
import { Account } from '@/models/Account'
import type Level from '@/models/Level'
import YouTubeIcon from '../Icons/YouTubeIcon'
import LevelCard from '../Levels/LevelCard'

export default function SubmitRecordModal({
  setOpen,
  isOpen,
  admin = false
}: {
  setOpen: (isOpen: boolean) => void
  isOpen: boolean
  admin?: boolean
}) {
  const [level, setLevel] = useState(undefined as undefined | Level)
  const [submitResult, setSubmitResult] = useState(0)
  const [account, setAccount] = useState(undefined as Account | undefined) // Only admin
  const [accountList, setAccountList] = useState([] as Account[]) // Only admin
  const [loading, setLoading] = useState(false)
  const [sliderValue, setSliderValue] = useState(100)
  const [videoURL, setVideoURL] = useState('')

  // Submit
  const handleSubmit = async () => {
    const percent = sliderValue
    let video = videoURL
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
    setVideoURL('')
    setLevel(undefined)
    setSliderValue(100)
  }

  // Si es plataforma, poner 100% por default
  useEffect(() => {
    if (level && level.platformer) {
      setSliderValue(100)
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
      onOpenChange={setOpen}
      isOpen={isOpen}
      // size={submitResult == 0 ? 'xl' : 'sm'}
      // scrollBehavior='inside'
    >
      <Modal.Backdrop>
        <Modal.Container size={submitResult == 0 ? 'lg' : 'md'} scroll='inside'>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Heading className='text-lg'>
                Nuevo Record {admin && `(admin)`}
              </Modal.Heading>
              <Modal.CloseTrigger />
            </Modal.Header>
            <Modal.Body>
              {loading ? (
                <div className='flex flex-col items-center justify-center gap-4'>
                  <Spinner size='lg' />
                  <p className='text text-medium text-center'>Cargando...</p>
                </div>
              ) : submitResult == 0 ? (
                <div className=''>
                  {/* {admin && (
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
                  )} */}
                  <SearchLevel setNewLevel={setLevel} />
                  {level && (
                    <>
                      <LevelCard level={level} />
                      <div className='mt-2 flex w-full flex-col gap-4'>
                        {level.platformer ? (
                          <span className='text-center'>
                            Los niveles del modo plataforma se tomarán como
                            totalmente completados al mandar el Record.
                            <br />
                            Si no has completado el nivel, <b>no lo envíes</b>.
                          </span>
                        ) : (
                          <Slider
                            className='border-success w-full'
                            defaultValue={100}
                            minValue={0}
                            maxValue={100}
                            value={sliderValue}
                            onChange={(value) =>
                              setSliderValue(value as number)
                            }
                          >
                            <Label>Porcentaje Completado</Label>
                            <Slider.Output>{sliderValue}%</Slider.Output>
                            <Slider.Track className='border-l-success'>
                              <Slider.Fill className='bg-success' />
                              <Slider.Thumb className='border-4 border-[#107d3f]' />
                            </Slider.Track>
                          </Slider>
                        )}
                        <TextField value={videoURL} onChange={setVideoURL}>
                          <Label>YouTube Video URL</Label>
                          <Input
                            className='mx-auto'
                            placeholder='https://youtu.be/...'
                            fullWidth
                            variant='secondary'
                          />
                        </TextField>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <SubmitResult submitResult={submitResult} />
              )}
            </Modal.Body>
            <Modal.Footer>
              {submitResult == 0 && !loading && (
                <Button
                  className='text-green-500'
                  variant='tertiary'
                  onPress={handleSubmit}
                  isDisabled={!level || (admin && !account?.username)}
                >
                  Enviar Record
                </Button>
              )}
              <Button variant='tertiary' onPress={() => setOpen(false)}>
                {submitResult == 0 ? 'Cerrar' : 'Aceptar'}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}

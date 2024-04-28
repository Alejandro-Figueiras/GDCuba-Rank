import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
  Spinner
} from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

import AccountStatsRow from './Admin/UserModalPanel/AccountStatsRow'
import AccountIconsRow from './Admin/UserModalPanel/AccountIconsRow'
import AccountStuff from './AccountManage/AccountStuff'
import RecordsLinkButton from './Records/RecordsLinkButton'

const UserModalView = ({
  user = { account: {}, stuff: [] },
  isOpen,
  onOpenChange
}) => {
  const { account, stuff = [] } = user
  const [isLoading, setIsLoading] = useState(false)
  const [stuffLoading, setStuffLoading] = useState(false)

  useEffect(() => {
    setIsLoading(isOpen && user.isLoading)
    if (isOpen && !user.isLoading && user.isStuffLoading) setStuffLoading(true)
    else setStuffLoading(false)
  }, [user, isOpen])

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size={!isLoading ? '3xl' : ''}
      scrollBehavior='inside'
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1 text-center'>
              {account.username}
            </ModalHeader>
            {isLoading ? (
              <div className='my-6 flex h-10 w-full flex-col items-center justify-center p-2'>
                <Spinner />
              </div>
            ) : (
              <>
                <ModalBody>
                  <AccountStatsRow user={account} />
                  <AccountIconsRow user={account} />
                  {account.stuff != '' && <Divider />}
                  <AccountStuff
                    account={account}
                    stuffItems={stuff}
                    manage={false}
                  />
                  {stuffLoading && (
                    <div className='mt-2 flex flex-col items-center'>
                      <Spinner />
                      <p className='text-medium'>Cargando stuff...</p>
                    </div>
                  )}
                </ModalBody>
                <ModalFooter>
                  <RecordsLinkButton username={account.username} />
                  <Button
                    color='primary'
                    onPress={async (e) => {
                      onClose()
                    }}
                  >
                    Cerrar
                  </Button>
                </ModalFooter>
              </>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default UserModalView

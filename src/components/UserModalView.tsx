import { Modal, Button, Separator, Spinner } from '@heroui/react'
import { useEffect, useState } from 'react'

import AccountStatsRow from './Admin/UserModalPanel/AccountStatsRow'
import AccountIconsRow from './Admin/UserModalPanel/AccountIconsRow'
import AccountStuff from './AccountManage/AccountStuff'
import RecordsLinkButton from './Records/RecordsLinkButton'
import { type UserInView } from '@/app/context/ModalContext'
import { Account } from '@/models/Account'

const UserModalView = ({
  user = { account: { username: '' }, stuff: [] },
  isOpen,
  setOpen
}: {
  user: UserInView | undefined
  isOpen: boolean
  setOpen: (isOpen: boolean) => void
}) => {
  const { account, stuff = [] } = user
  const [isLoading, setIsLoading] = useState(false)
  const [stuffLoading, setStuffLoading] = useState(false)

  useEffect(() => {
    setIsLoading(isOpen && !!user.isLoading)
    if (isOpen && !user.isLoading && user.isStuffLoading) setStuffLoading(true)
    else setStuffLoading(false)
  }, [user, isOpen])

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={setOpen}
      // scrollBehavior='inside'
    >
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className={!isLoading ? 'max-w-180' : undefined}>
            <Modal.Header>
              <Modal.Heading className='flex flex-col gap-1 text-center text-lg'>
                {account.username}
              </Modal.Heading>
            </Modal.Header>
            {isLoading ? (
              <div className='my-6 flex h-10 w-full flex-col items-center justify-center p-2'>
                <Spinner />
              </div>
            ) : (
              <>
                <Modal.Body>
                  <AccountStatsRow user={account as Account} />
                  <AccountIconsRow user={account as Account} />
                  {(account as Account).stuff != '' && <Separator />}
                  <AccountStuff
                    account={account as Account}
                    stuffItems={stuff}
                    manage={false}
                  />
                  {stuffLoading && (
                    <div className='mt-2 flex flex-col items-center'>
                      <Spinner />
                      <p className='text-medium'>Cargando stuff...</p>
                    </div>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <RecordsLinkButton username={account.username} />
                  <Button
                    onPress={async () => {
                      setOpen(false)
                    }}
                  >
                    Cerrar
                  </Button>
                </Modal.Footer>
              </>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}

export default UserModalView

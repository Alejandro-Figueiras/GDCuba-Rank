import { updateStuffItemDataAction } from '@/actions/accounts/stuffActions'
import { useSesion } from '@/hooks/useSesion'
import { notify } from '@/libs/toastNotifications'
import { useDisclosure } from '@nextui-org/react'
import type StuffHandlers from './StuffHandlers'
import type DictionaryObject from '@/helpers/DictionaryObject'
import type StuffItem from '@/models/StuffItem'

export const useEditStuffItem = ({
  id,
  handlers,
  notifyTexts
}: {
  id: number
  handlers?: StuffHandlers
  notifyTexts?: {
    success?: string
    error?: string
  }
}) => {
  const { currentUser } = useSesion()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const handleEdit = () => {
    onOpen()
  }

  const handleUpdate = async (itemData: DictionaryObject<any>) => {
    if (!currentUser.accountid || !currentUser.username) return
    const item: StuffItem = {
      accountid: currentUser.accountid,
      username: currentUser.username,
      data: JSON.stringify(itemData),
      id
    }

    const result = await updateStuffItemDataAction(item)
    console.log(result)
    if (result) {
      item.id = id
      if (handlers?.setStuffItems)
        handlers.setStuffItems((items: StuffItem[]) => {
          const newItems: StuffItem[] = []
          for (const item of items) {
            if (item.id == id) item.data = JSON.stringify(itemData)
            newItems.push(item)
          }
          return newItems
        })

      notify(notifyTexts?.success ?? 'Item Actualizado', 'success')
    } else {
      notify(notifyTexts?.error ?? 'Error al actualizar el item', 'error')
    }
  }

  return {
    handleEdit,
    handleUpdate,
    modalDisclosure: {
      isOpen,
      onOpen,
      onOpenChange
    }
  }
}

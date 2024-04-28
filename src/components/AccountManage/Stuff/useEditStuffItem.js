import { updateStuffItemDataAction } from '@/actions/accounts/stuffActions'
import { useSesion } from '@/hooks/useSesion'
import { notify } from '@/libs/toastNotifications'
import { useDisclosure } from '@nextui-org/react'

export const useEditStuffItem = ({
  id,
  handlers,
  notifyTexts = {
    success: 'Item Actualizado',
    error: 'Error al actualizar el item'
  }
}) => {
  const { currentUser } = useSesion()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const handleEdit = () => {
    onOpen()
  }

  const handleUpdate = async (itemData = '') => {
    const item = {
      accountid: currentUser.accountid,
      username: currentUser.username,
      data: JSON.stringify(itemData),
      id
    }

    const result = await updateStuffItemDataAction(item)
    console.log(result)
    if (result) {
      item.id = id
      handlers.setStuffItems((items) => {
        const newItems = []
        for (const item of items) {
          if (item.id == id) item.data = JSON.stringify(itemData)
          newItems.push(item)
        }
        return newItems
      })

      notify(notifyTexts.success, 'success')
    } else {
      notify(notifyTexts.error, 'error')
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

import { Id, toast, ToastOptions } from 'react-toastify'

export const notify = (message: string, type = 'info') => {
  const configs: ToastOptions = {
    position: 'bottom-center',
    theme: 'dark'
  }
  switch (type) {
    case 'info':
      return toast.info(message, configs)
    case 'success':
      return toast.success(message, configs)
    case 'loading':
      return toast.loading(message, configs)
    case 'error':
      return toast.error(message, configs)
  }
}

export const notifyDismiss = (toastInstance: Id, delay = 0.5) => {
  return setTimeout(() => {
    toast.dismiss(toastInstance)
  }, 1000 * delay)
}

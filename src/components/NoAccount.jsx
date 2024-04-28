const { useSesion } = require('@/hooks/useSesion')

const NoAccount = ({ message }) => {
  const defaultMessage = 'Necesitas una cuenta para esta sección xd'
  const { login, signUp } = useSesion()
  return (
    <div className='flex h-[400px] flex-col items-center justify-center'>
      <h2 className='text-xl'>{message || defaultMessage}</h2>
      <p>
        <span
          className='cursor-pointer font-semibold text-cyan-600'
          onClick={login}
        >
          Inicia sesion
        </span>{' '}
        o{' '}
        <span
          className='cursor-pointer font-semibold text-cyan-600'
          onClick={signUp}
        >
          Registrate
        </span>
      </p>
    </div>
  )
}

export default NoAccount

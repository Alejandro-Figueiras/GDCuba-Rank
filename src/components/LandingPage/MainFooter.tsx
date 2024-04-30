const MainFooter = () => {
  return (
    <div className='container mx-auto mt-10 flex flex-row items-center justify-between gap-4 border-t-1 border-default-200 p-4'>
      <div className=''>
        ©{' '}
        <a
          href='https://github.com/Alejandro-Figueiras'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:underline'
        >
          Alejandro Figueiras
        </a>
        , GD Cuba Community. 2024 All Rights Reserved.
      </div>
      <div className='flex min-w-10 flex-row gap-4'>
        <a
          href='https://github.com/Alejandro-Figueiras/GDCuba-Rank'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img
            src='/assets/ui/github-mark-white.svg'
            className='w-8 transition hover:scale-125'
            alt='GitHub Repo'
          />
        </a>
      </div>
    </div>
  )
}

export default MainFooter

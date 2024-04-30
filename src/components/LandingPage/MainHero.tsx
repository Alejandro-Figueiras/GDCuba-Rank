import './MainHero.css'
const MainHero = () => {
  return (
    <div className='global-full-height container relative mx-auto flex flex-row items-center justify-center'>
      <div className=' my-16 flex flex-col items-center py-8'>
        <img
          src='/assets/HD_512.png'
          className='mb-4 w-40 min-[480px]:w-48 md:w-56'
          alt=''
        />
        <h1 className='gdcuba-main-text mb-4 text-4xl font-extrabold min-[480px]:text-5xl md:text-7xl'>
          GD Cuba ΔΔΔ
        </h1>
        <h2 className='mb-2 text-xl font-extrabold min-[480px]:text-3xl md:mb-4 md:text-5xl'>
          La comunidad más sólida de
        </h2>
        <img
          src='/assets/gd_title.png'
          className='max-h-8 min-[480px]:max-h-11 md:max-h-16'
          alt='Geometry Dash'
        />
      </div>
    </div>
  )
}

export default MainHero

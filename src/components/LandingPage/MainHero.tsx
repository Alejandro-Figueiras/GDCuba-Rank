const MainHero = () => {
  return (
    <div className='global-full-height relative container mx-auto flex flex-row items-center justify-center'>
      <div className='my-16 flex flex-col items-center py-8'>
        <div
          className='mb-4 w-40 bg-contain bg-center bg-no-repeat min-[480px]:w-48 md:w-56'
          style={{
            backgroundImage: "url('/assets/HD_512.png')",
            aspectRatio: '1/1'
          }}
          aria-label='Logo GD Cuba'
        />
        <h1
          className='mb-4 bg-clip-text text-4xl font-extrabold text-transparent min-[480px]:text-5xl md:text-7xl'
          style={{
            backgroundImage: 'linear-gradient(120deg, #029ffe 30%, #029ffe)'
          }}
        >
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

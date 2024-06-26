const MainInfo = () => {
  return (
    <div className='container mx-auto mt-28 flex max-w-[1280px] flex-col items-center gap-12 px-6'>
      <div className='flex flex-col items-center gap-4 md:flex-row md:gap-10'>
        <div>
          <img
            src='/assets/gd_icon.webp'
            alt='Geometry Dash Icon'
            className='mb-4 w-40 rounded-3xl min-[480px]:w-48 md:min-w-56 md:max-w-56'
          />
        </div>
        <div>
          <h2 className='mb-4 text-center text-3xl font-bold md:text-start'>
            ¿Nuevo en el Juego?
          </h2>
          <p className='text-md mb-2 text-pretty lg:text-lg'>
            Geometry Dash es un videojuego rítmico y de plataformas creado en
            2013 por el desarrollador sueco Robert Topala (más conocido como
            RobTop), y posteriormente desarrollado por su empresa independiente
            RobTop Games.
          </p>
          <p className='text-md mb-2 text-pretty lg:text-lg'>
            Este juego utiliza un sistema sencillo de pulsación (o clicks) para
            controlar diferentes vehículos. Donde el objetivo es completar
            niveles al 100%. Si el jugador salta erróneamente y cae sobre un
            pincho u obstáculo, morirá y deberá empezar el nivel desde el
            inicio.
          </p>
        </div>
      </div>

      <div className='flex flex-col items-center gap-4 md:flex-row md:gap-10'>
        <div>
          <img
            src='/assets/community_icon.webp'
            alt='Geometry Dash Icon'
            className='mb-4 w-40 rounded-3xl min-[480px]:w-48 md:min-w-56 md:max-w-56'
          />
        </div>
        <div>
          <h2 className='mb-4 text-center text-3xl font-bold md:text-start'>
            Nuestra Comunidad
          </h2>
          <p className='text-md mb-2 text-pretty lg:text-lg'>
            El 28 de septiembre de 2019 se creó GD Cuba, antiguo grupo de
            WhatsApp que evolucionó a la gran comunidad creada por Rann0x el 11
            de diciembre de 2020. Agrupa todos los cubanos en Geometry Dash,
            tanto creadores como jugadores, retirados y activos.
          </p>
          <p className='text-md mb-2 text-pretty lg:text-lg'>
            Si eres cubano, y aún no estás, te invitamos a registrarte en esta
            página. Uno de los administradores revisará tu perfil y te invitará
            a entrar a nuestra comunidad.
          </p>
        </div>
      </div>
    </div>
  )
}

export default MainInfo

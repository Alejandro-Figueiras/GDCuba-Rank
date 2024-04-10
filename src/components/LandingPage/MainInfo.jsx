const MainInfo = () => {
  return <div className="container mx-auto flex flex-col items-center gap-12 max-w-[1280px] px-6 mt-28">
    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10">
      <div>
        <img src="/assets/gd_icon.webp" alt="Geometry Dash Icon" className="w-40 min-[480px]:w-48 md:min-w-56 md:max-w-56 mb-4 rounded-3xl"/>
      </div>
      <div>
        <h2 className="font-bold text-3xl mb-4 text-center md:text-start">¿Nuevo en el Juego?</h2>
        <p className="text-md lg:text-lg mb-2 text-pretty">Geometry Dash es un videojuego rítmico y de plataformas creado en 2013 por el desarrollador sueco Robert Topala (más conocido como RobTop), y posteriormente desarrollado por su empresa independiente RobTop Games.</p>
        <p className="text-md lg:text-lg mb-2 text-pretty">Este juego utiliza un sistema sencillo de pulsación (o clicks) para controlar diferentes vehículos. Donde el objetivo es completar niveles al 100%. Si el jugador salta erróneamente y cae sobre un pincho u obstáculo, morirá y deberá empezar el nivel desde el inicio.</p>
      </div>
    </div>

    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10">
      <div>
        <img src="/assets/community_icon.webp" alt="Geometry Dash Icon" className="w-40 min-[480px]:w-48 md:min-w-56 md:max-w-56 mb-4 rounded-3xl"/>
      </div>
      <div>
        <h2 className="font-bold text-3xl mb-4 text-center md:text-start">Nuestra Comunidad</h2>
        <p className="text-md lg:text-lg mb-2 text-pretty">El 28 de septiembre de 2019 se creó GD Cuba, antiguo grupo de WhatsApp que evolucionó a la gran comunidad creada por Rann0x el 11 de diciembre de 2020. Agrupa todos los cubanos en Geometry Dash, tanto creadores como jugadores, retirados y activos.</p>
        <p className="text-md lg:text-lg mb-2 text-pretty">Si eres cubano, y aún no estás, te invitamos a registrarte en esta página. Uno de los administradores revisará tu perfil y te invitará a entrar a nuestra comunidad.</p>
      </div>
    </div>
  </div>
}

export default MainInfo;
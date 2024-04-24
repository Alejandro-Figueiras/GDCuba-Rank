import './MainHero.css'
const MainHero = () => {
  return <div className="container relative mx-auto global-full-height flex flex-row items-center justify-center">
    <div className=" my-16 flex flex-col items-center py-8">
      <img src="/assets/HD_512.png" className="w-40 min-[480px]:w-48 md:w-56 mb-4" alt=""/>
      <h1 className="text-4xl min-[480px]:text-5xl md:text-7xl font-extrabold gdcuba-main-text mb-4">GD Cuba ΔΔΔ</h1>
      <h2 className="text-xl min-[480px]:text-3xl md:text-5xl font-extrabold mb-2 md:mb-4">La comunidad más sólida de</h2>
      <img src="/assets/gd_title.png" className="max-h-8 min-[480px]:max-h-11 md:max-h-16" alt="Geometry Dash"/>
    </div>
    
  </div>
}

export default MainHero
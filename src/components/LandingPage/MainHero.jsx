import './MainHero.css'
const MainHero = () => {
  return <div className="container relative mx-auto global-full-height flex flex-row items-center justify-center">
    <div className=" my-16 flex flex-col items-center py-8">
      <img src="/assets/HD_512.png" alt="" className="w-56 mb-4" />
      <h1 className="text-7xl font-extrabold gdcuba-main-text mb-4">GD Cuba ΔΔΔ</h1>
      <h2 className="text-5xl font-extrabold flex flex-col">La comunidad más sólida de</h2>
      <br/>
      <img src="/assets/gd_title.png" style={{maxHeight: "4rem"}}/>
    </div>
    
  </div>
}

export default MainHero
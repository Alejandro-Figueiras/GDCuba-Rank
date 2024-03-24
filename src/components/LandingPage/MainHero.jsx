import './MainHero.css'
const MainHero = () => {
  return <div className="container mx-auto global-full-height flex flex-row items-center justify-center">
    <div className="my-16 flex flex-col items-center">
      <img src="/assets/moai.webp" alt="MOAI" className="w-56 mb-4"/>
      <h1 className="text-5xl font-extrabold flex flex-col">
        La comunidad más sólida de
      </h1>
      <br/>
      <img src="/assets/gd_title.png" style={{maxHeight: "4rem"}}/>
    </div>
    
  </div>
}

export default MainHero
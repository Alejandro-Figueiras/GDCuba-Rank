'use client'

import { useGDIcon } from "./useGDIcon"

const GDIcon = ({type = "cube", iconNumber = 1, c1 = 1, c2 = 2, glow = false, imageStyles = {}, imageClassNames = ""}) => {
  const {printCanvas, finalImage, WS, WI, HS, HI } = useGDIcon({
    type, iconNumber, c1, c2, glow
  });
  
  return (
    <>
      <canvas style={{display: 'none'}} ref={printCanvas} width={WS+WI} height={HS+HI}></canvas>
      <img src="/assets/default_icon.png" alt="Icon" ref={finalImage} style={imageStyles} className={imageClassNames}/>
    </>
  )
}

export default GDIcon;

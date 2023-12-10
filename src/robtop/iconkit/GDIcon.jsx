'use client'

import { useGDIcon } from "./useGDIcon"

const GDIcon = ({type = "cube", iconNumber = 1, c1 = 1, c2 = 2, glow = false, imageStyles = {}, imageClassNames = ""}) => {
  const { finalImage } = useGDIcon({
    type, iconNumber, c1, c2, glow
  });
  
  return (
    <>
      <img src="/assets/default_icon.png" alt="Icon" ref={finalImage} style={imageStyles} className={imageClassNames}/>
    </>
  )
}

export default GDIcon;

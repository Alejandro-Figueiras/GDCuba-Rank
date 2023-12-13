import { useEffect, useRef } from 'react';
import { makeIcon } from './makeIcon';

export const useGDIcon = ({
  type, iconNumber, c1, c2, glow
}) => {
  const finalImage = useRef()

  useEffect(() => {
    const currentUrl = window.location.href;
    const hostURL = currentUrl.split("/").slice(0,3).join("/")
    const logic = async() => {
      let img = localStorage.getItem(`${type}_${iconNumber}_${c1}_${c2}_${glow?1:0}`)
      if (!img) {
        img = await makeIcon({type, iconNumber, c1, c2, glow, hostURL})
        localStorage.setItem(`${type}_${iconNumber}_${c1}_${c2}_${glow?1:0}`, img)
      }
      if (finalImage.current) {
        finalImage.current.src = img
      }
    }
    logic()
  }, [])

  return { icon: finalImage }
}
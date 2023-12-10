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
      const final = await makeIcon({type, iconNumber, c1, c2, glow, hostURL})
      console.log(final)
      finalImage.current.src = final
    }
    logic()
  }, [])

  return { finalImage }
}
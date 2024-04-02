import { useEffect, useRef, useState} from 'react';
import { getGDAccount } from '@/database/db.gdaccounts';
import { makeIcon } from './makeIcon';

const DEFAULT_CUBE = 'data:image/png;base64,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'
const icon22 = {
  cube: 484,
  ship: 169,
  ball: 118,
  ufo: 149,
  wave: 96,
  robot: 68,
  spider: 69,
  swing: 43,
  jetpack: 5,
  colors: 106,
}

const getIcon = async({
  type = 'cube', iconNumber = 1, c1 = 0, c2=5, c3=12, glow = false,
  username = null, hostURL
}) => {

  if (username) {
    const gdacc = await getGDAccount(username);
    if (gdacc) {
      switch(type) {
        case 'ship':
          iconNumber = gdacc.accship; break;
        case 'ball':
          iconNumber = gdacc.accball; break;
        case 'ufo':
          iconNumber = gdacc.accbird; break;
        case 'wave':
          iconNumber = gdacc.accwave; break;
        case 'robot': 
          iconNumber = gdacc.accrobot; break;
        case 'spider':
          iconNumber = gdacc.accspider; break;
        default:
          iconNumber = gdacc.accicon; break;
      }
      c1 = gdacc.playercolor;
      c2 = gdacc.playercolor2;
      glow = gdacc.accglow;
      c3 = gdacc.playercolor3;
    }
  }
  if (iconNumber>icon22[type]) {iconNumber=1};
  if (c1>icon22.colors) {c1=0};
  if (c2>icon22.colors) {c2=5};
  if (c3>icon22.colors) {c3=12};
  let img = localStorage.getItem(`${type}_${iconNumber}_${c1}_${c2}_${glow?`1_${c3}`:0}`)
  if (!img) {
    img = await makeIcon({type, iconNumber, c1, c2, c3, glow, hostURL})
    localStorage.setItem(`${type}_${iconNumber}_${c1}_${c2}_${glow?`1_${c3}`:0}`, img)
  }
  return img;
}

export const useGDIconRef = ({
  type = 'cube', iconNumber = 1, c1 = 0, c2=5, c3=12, glow = false, effectDeps = [],
  username = null
}) => {
  const finalImage = useRef()
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const currentUrl = window.location.href;
    const hostURL = currentUrl.split("/").slice(0,3).join("/")
    const logic = async() => {
      setLoading(true);
      const img = await getIcon({
        type, iconNumber, c1, c2, c3, glow, hostURL, username
      })
      if (finalImage.current) {
        finalImage.current.src = img
      }
      setLoading(false);
    }
    logic()
  }, [...effectDeps])

  return { icon: finalImage, loading }
}

export const useGDIcon = ({
  type = 'cube', iconNumber = 1, c1 = 0, c2=5, c3=12, glow = false, effectDeps = [],
  username = null
}) => {
  const [iconSrc, setIcon] = useState(DEFAULT_CUBE)

  useEffect(() => {
    const currentUrl = window.location.href;
    const hostURL = currentUrl.split("/").slice(0,3).join("/")
    const logic = async() => {
      const img = await getIcon({
        type, iconNumber, c1, c2, c3, glow, hostURL, username
      })
      setIcon(img)
    }
    logic()
  }, [...effectDeps])

  return { icon: iconSrc }
}
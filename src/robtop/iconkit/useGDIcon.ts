import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { makeIcon } from './makeIcon'
import { getAccountAction } from '@/actions/accounts/getAccountAction'
import { type IconTypes } from './Icons'

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
  colors: 106
}

const getIcon = async ({
  type = 'cube',
  iconNumber = 1,
  c1 = 0,
  c2 = 5,
  c3 = 12,
  glow = false,
  username = null,
  hostURL
}: {
  type?: IconTypes
  iconNumber?: number
  c1?: number
  c2?: number
  c3?: number
  glow?: boolean | number
  username?: string | null
  hostURL: string
}) => {
  if (username) {
    const gdaccInfo = await getAccountAction({ username })
    if (!gdaccInfo) return undefined
    const gdacc = JSON.parse(gdaccInfo)
    if (gdacc) {
      switch (type) {
        case 'ship':
          iconNumber = gdacc.accship
          break
        case 'ball':
          iconNumber = gdacc.accball
          break
        case 'ufo':
          iconNumber = gdacc.accbird
          break
        case 'wave':
          iconNumber = gdacc.accwave
          break
        case 'robot':
          iconNumber = gdacc.accrobot
          break
        case 'spider':
          iconNumber = gdacc.accspider
          break
        default:
          iconNumber = gdacc.accicon
          break
      }
      c1 = gdacc.playercolor
      c2 = gdacc.playercolor2
      glow = gdacc.accglow
      c3 = gdacc.playercolor3
    }
  }
  if (iconNumber > icon22[type]) {
    iconNumber = 1
  }
  if (c1 > icon22.colors) {
    c1 = 0
  }
  if (c2 > icon22.colors) {
    c2 = 5
  }
  if (c3 > icon22.colors) {
    c3 = 12
  }
  let img = localStorage.getItem(
    `${type}_${iconNumber}_${c1}_${c2}_${glow ? `1_${c3}` : 0}`
  )
  if (!img) {
    img = await makeIcon({ type, iconNumber, c1, c2, c3, glow, hostURL })
    if (!img) return undefined
    localStorage.setItem(
      `${type}_${iconNumber}_${c1}_${c2}_${glow ? `1_${c3}` : 0}`,
      img
    )
  }
  return img
}

export const useGDIconRef = ({
  type = 'cube',
  iconNumber = 1,
  c1 = 0,
  c2 = 5,
  c3 = 12,
  glow = false,
  username = null
}: {
  type?: IconTypes
  iconNumber?: number
  c1?: number
  c2?: number
  c3?: number
  glow?: boolean | number
  username?: string | null
}) => {
  const finalImage = useRef() as MutableRefObject<HTMLImageElement>
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const currentUrl = window.location.href
    const hostURL = currentUrl.split('/').slice(0, 3).join('/')
    const logic = async () => {
      setLoading(true)
      const img = await getIcon({
        type,
        iconNumber,
        c1,
        c2,
        c3,
        glow,
        hostURL,
        username
      })
      if (!img) return
      if (finalImage.current) {
        finalImage.current.src = img
      }
      setLoading(false)
    }
    setTimeout(logic)
  }, [c1, c2, c3, glow, iconNumber, type, username])

  return { icon: finalImage, loading }
}

export const useGDIcon = ({
  type = 'cube',
  iconNumber = 1,
  c1 = 0,
  c2 = 5,
  c3 = 12,
  glow = false,
  username = null
}: {
  type?: IconTypes
  iconNumber?: number
  c1?: number
  c2?: number
  c3?: number
  glow?: boolean | number
  username?: string | null
}) => {
  const [iconSrc, setIcon] = useState<string | undefined>(undefined)

  useEffect(() => {
    const currentUrl = window.location.href
    const hostURL = currentUrl.split('/').slice(0, 3).join('/')
    const logic = async () => {
      const img = await getIcon({
        type,
        iconNumber,
        c1,
        c2,
        c3,
        glow,
        hostURL,
        username
      })
      console.log(img)
      if (img) setIcon(img)
    }
    setTimeout(logic)
  }, [type, iconNumber, c1, c2, c3, glow, username])

  return { icon: iconSrc }
}

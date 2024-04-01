"use client"
import { useGDIcon } from "@/robtop/iconkit/useGDIcon"

export default () => {
  const {icon} = useGDIcon({
    type: 'ufo',
    iconNumber: 1
  })
  return <div>
    <img src={icon} alt="" />
  </div>
}
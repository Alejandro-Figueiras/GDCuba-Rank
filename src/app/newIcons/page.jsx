"use client"

import { useGDIcon } from "@/robtop/iconkit/useGDIcon"

export default () => {
  const { icon } = useGDIcon({

  })

  return (<div className="p-4">
    <img src={icon} alt="" />
  </div>)
}
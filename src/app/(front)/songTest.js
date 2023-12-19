"use server"

import getSong from "@/robtop/getSong"

export const songTest = async() => {
  return JSON.stringify(await getSong(810139))
}
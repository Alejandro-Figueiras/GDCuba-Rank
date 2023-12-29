'use server'
import { kv } from '@vercel/kv'

export const dbInit = async() => {
  if (!kv.exists('accUpdateLimit')) {
    await kv.set('accUpdateLimit', 0)
    return;
  }
}

export const dbExists = () => {
  return false
}

export const dbClear = () => {
  return global.cache = undefined
}
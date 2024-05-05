export interface RecordLevel {
  levelid: number
  levelname: string
  difficulty: number
  featured: string
  difficultyscore: number
  platformer: number | boolean
}
export interface Record extends RecordLevel {
  id: number
  accountid: number
  username: string
  percent: number
  aval: number
  video: string | undefined
  cuba: number | boolean
}

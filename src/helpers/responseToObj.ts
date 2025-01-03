export interface RobTopDictionary {
  [Key: string]: string
}

const responseToObj = (str = '', separador = ':') => {
  const data = str.split('#')[0].split(separador)

  const res: RobTopDictionary = {}
  for (let i = 0; i < data.length; i += 2) {
    res[data[i]] = data[i + 1]
  }

  return res
}

export default responseToObj

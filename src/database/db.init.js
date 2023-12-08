export const dbInit = () => {
  global.cache = {}
  console.log("Inicializa cache global")
}

export const dbExists = () => {
  return (global.cache != undefined)
}
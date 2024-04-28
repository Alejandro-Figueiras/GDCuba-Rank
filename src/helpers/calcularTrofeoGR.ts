export const calcularTrofeo = (globalrank: number) => {
  if (globalrank == 0) return '/assets/trofeos/rankIcon_all_001.png'
  if (globalrank == 1) {
    return '/assets/trofeos/rankIcon_1_001.png'
  } else if (globalrank <= 10) {
    return '/assets/trofeos/rankIcon_top10_001.png'
  } else if (globalrank <= 50) {
    return '/assets/trofeos/rankIcon_top50_001.png'
  } else if (globalrank <= 100) {
    return '/assets/trofeos/rankIcon_top100_001.png'
  } else if (globalrank <= 200) {
    return '/assets/trofeos/rankIcon_top200_001.png'
  } else if (globalrank <= 500) {
    return '/assets/trofeos/rankIcon_top500_001.png'
  } else if (globalrank <= 1000) {
    return '/assets/trofeos/rankIcon_top1000_001.png'
  } else {
    return '/assets/trofeos/rankIcon_all_001.png'
  }
}

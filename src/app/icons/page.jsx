'use client'
import { makeIcon } from '@/robtop/iconkit/makeIcon';
import {useState, useEffect} from 'react'

export default function Home() {
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    const currentUrl = window.location.href;
    const hostURL = currentUrl.split("/").slice(0,3).join("/")

    const asyncF = async() => {
      const newIcons = [];
      const types = {
        cube: 484,
        ship: 169,
        ball: 118,
        ufo: 149,
        wave: 96,
        robot: 68,
        spider: 69,
        swing: 43,
        jetpack: 5,
      }
      for (const type of Object.keys(types)) {
        for (let i = 1; i < types[type]; i++) {
          newIcons.push(await makeIcon({
            type,
            iconNumber: i,
            c1: 1,
            c2: 5,
            glow: true,
            hostURL
          }))
          console.log(`Terminado ${type} ${i}`)
          setIcons(newIcons)
        }
      }
    }
    asyncF()
  }, [])

  return (<main style={{
    display: 'grid',
    width: '100%',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '4px'
  }}>
    
    {icons.map((icon, i) => (<img src={icon} alt={`icon ${i}`} key={i}/>))}
  </main>)
}
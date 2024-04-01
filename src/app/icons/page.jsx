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
        cube: 142,
        ship: 51,
        ball: 43,
        ufo: 35,
        wave: 35,
        robot: 26,
        spider: 17
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
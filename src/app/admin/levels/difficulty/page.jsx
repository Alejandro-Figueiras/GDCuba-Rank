'use client'
import { getAllLevelsByDifficultyAction } from '@/actions/admin/recordLevelsAction'
import { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'
import TableTitle from '@/components/Admin/TableTitle'
import TablaNivelesDifficultyScore from '@/components/Admin/Records/TablaNivelesDifficultyScore'

const LevelsDificulty = () => {
  const [levels, setLevels] = useState({})

  const updateLevels = () => {
    getAllLevelsByDifficultyAction({difficulty: 15}).then(response => {
      console.log(response)
      const records = JSON.parse(response)
      console.log(records)
      const newLevels = {};
      for (const record of records) {
        const level = {
          levelid: record.levelid,
          levelname: record.levelname,
          featured: record.featured,
          difficulty: record.difficulty,
          difficultyscore: record.difficultyscore
        }
        if (newLevels[level.levelid] == undefined) {
          newLevels[level.levelid] = level;
        }
      }

      console.log(newLevels)
      setLevels(newLevels)
    })
  }

  useEffect(updateLevels, [])
  
  return (<div className="component px-8 py-4">
    <TableTitle title="Extreme Demons" handleRefresh={updateLevels}/>
    <TablaNivelesDifficultyScore levels={Object.values(levels)} />
  </div>)
}

export default LevelsDificulty
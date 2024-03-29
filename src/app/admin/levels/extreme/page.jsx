'use client'
import { getAllLevelsByDifficultyAction } from '@/actions/admin/recordLevelsAction'
import { useEffect, useState } from 'react'
import TablaNivelesDifficultyScore from '@/components/Admin/Records/TablaNivelesDifficultyScore'
import TablaHeader from '@/components/Admin/TablaHeader'

const LevelsDificulty = () => {
  const [levels, setLevels] = useState({})
  const [loading, setLoading] = useState(true)

  const updateLevels = () => {
    setLoading(true)
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
      setLoading(false)
    })
  }

  useEffect(updateLevels, [])
  
  return (<TablaHeader title="Extreme Demons" buttons={[{
    text: "Refresh",
    handleClick: updateLevels
  }]}>
    <TablaNivelesDifficultyScore levels={Object.values(levels)} handleRefresh={updateLevels} loading={loading}/>
  </TablaHeader>
  )
}

export default LevelsDificulty
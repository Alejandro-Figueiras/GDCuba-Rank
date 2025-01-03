'use client'
import { getAllLevelsByDifficultyAction } from '@/actions/admin/recordLevelsAction'
import { useEffect, useState } from 'react'
import TablaNivelesDifficultyScore from '@/components/Admin/Records/TablaNivelesDifficultyScore'
import TablaHeader from '@/components/Admin/TablaHeader'
import { RecordLevel, type Record } from '@/models/Record'
import DictionaryObject from '@/helpers/DictionaryObject'

const LevelsDificulty = () => {
  const [levels, setLevels] = useState({} as DictionaryObject<RecordLevel>)
  const [loading, setLoading] = useState(true)

  const updateLevels = () => {
    setLoading(true)
    getAllLevelsByDifficultyAction({ difficulty: 15 }).then((response) => {
      console.log(response)
      if (!response) return updateLevels()
      const records = JSON.parse(response) as Record[]
      console.log(records)
      const newLevels = {} as DictionaryObject<RecordLevel>
      for (const record of records) {
        const level: RecordLevel = {
          levelid: record.levelid,
          levelname: record.levelname,
          featured: record.featured,
          difficulty: record.difficulty,
          difficultyscore: record.difficultyscore,
          platformer: record.platformer
        }

        console.log(level)
        if (newLevels[level.levelid] == undefined) {
          newLevels[level.levelid] = level
        }
      }

      console.log(newLevels)
      setLevels(newLevels)
      setLoading(false)
    })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(updateLevels, [])

  return (
    <div>
      <TablaHeader
        title='Extreme Demons Tradicionales'
        buttons={[
          {
            text: 'Refresh',
            handleClick: updateLevels
          }
        ]}
      >
        <TablaNivelesDifficultyScore
          levels={Object.values(levels).filter((val) => val.platformer == 0)}
          handleRefresh={updateLevels}
          loading={loading}
        />
      </TablaHeader>

      <TablaHeader title='Extreme Demons Plataforma' buttons={[]}>
        <TablaNivelesDifficultyScore
          levels={Object.values(levels).filter((val) => val.platformer == 1)}
          handleRefresh={updateLevels}
          loading={loading}
        />
      </TablaHeader>
    </div>
  )
}

export default LevelsDificulty

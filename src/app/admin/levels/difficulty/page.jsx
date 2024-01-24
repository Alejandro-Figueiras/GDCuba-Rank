'use client'
import { getAllRecordsAction } from '@/actions/admin/getRecordAction'
import { useEffect, useState } from 'react'

const LevelsDificulty = () => {
  const updateRecords = () => {
    getAllRecordsAction().then(response => {
      const records = JSON.parse(response)
      console.log(records)
      const levels = {};
      for (const record of records) {
        const level = {
          levelid: record.levelid,
          levelname: record.levelname,
          difficulty: record.difficulty,
          difficultyscore: record.difficultyscore
        }
        if (levels[level.levelid] == undefined) {
          levels[level.levelid] = level;
        }
      }

      console.log(levels)
      // setRecords(nuevosRecords)
    })
  }

  useEffect(updateRecords, [])
  
  return ('Hola buenas')
}

export default LevelsDificulty
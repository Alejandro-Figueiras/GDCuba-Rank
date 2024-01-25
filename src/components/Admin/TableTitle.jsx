'use client'
import { Button } from '@nextui-org/react'

const TableTitle = ({handleRefresh, title}) => {
  return (
    <div className="flex justify-between">
      <h2 className="pt-4 pb-2 text-2xl">{title}</h2>
      <div className="flex">
        <Button onClick={handleRefresh}>
          Refresh
        </Button>
      </div>
    </div>
  )
}

export default TableTitle;
'use client'
import { Button } from "@nextui-org/react"

const TablaHeader = ({title, buttons = [], children}) => {
  return (
    <div className="px-8 py-4">
      <div className="flex justify-between">
        <h2 className="pt-4 pb-2 text-2xl">{title}</h2>
        <div className="flex gap-2">
          {buttons.map((button, i) => 
          <Button onClick={button.handleClick} key={i}>
            {button.text}
          </Button>)}
        </div>
      </div>
      {children}
    </div>
  )
}

export default TablaHeader;
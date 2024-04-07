'use client'
import { Button } from "@nextui-org/react"

const TablaHeader = ({title, buttons = [], children}) => {
  return (
    <div className="px-8 py-4">
      <div className="flex items-center flex-col sm:flex-row sm:justify-between pb-4">
        <h2 className="pb-2 text-2xl text-center sm:text-start">{title}</h2>
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
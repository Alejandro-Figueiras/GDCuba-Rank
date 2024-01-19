'use client'

const StuffText = ({itemData}) => {
  
  return <div className="flex flex-col gap-2">
    <div className="flex flex-row justify-between">
      <span className="text-xs font-medium text-default-500">Texto</span>
    </div>
    <p>
      {itemData.text}
    </p>
  </div>
}

export default StuffText;
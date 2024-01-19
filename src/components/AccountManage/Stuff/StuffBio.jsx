'use client'

import StuffItemTitle from "./StuffItemTitle";

const StuffBio = ({itemData, id, handlers}) => {
  // TODO delete
  // TODO subir
  // TODO bajar
  return <div className="flex flex-col my-2">
    <StuffItemTitle title='Biografía' id={id} handlers={handlers}/>
    <p>
      {itemData.text.split(`\n`).map(text=><>
      {text}<br/>
      </>)}
    </p>
  </div>
}

export default StuffBio;
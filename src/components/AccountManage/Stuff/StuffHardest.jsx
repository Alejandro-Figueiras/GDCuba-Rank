'use client'

import { useDisclosure } from '@nextui-org/react'
import StuffBioEditModal from "./StuffBioEditModal";
import StuffItemTitle from "./StuffItemTitle";
import { updateStuffItemDataAction } from '@/actions/accounts/stuffActions'
import { useSesion } from '@/hooks/useSesion';
import { notify } from '@/libs/toastNotifications';

const StuffHardest = ({itemData, id, handlers, manage = false, accStuff}) => {

  return <div className="flex flex-col my-2">
    <StuffItemTitle title='Hardest Levels' id={id} handlers={{...handlers}} manage={manage} accStuff={accStuff}/>
    <div>
      {/* {itemData.text.split(`\n`).map((text, i)=><p key={`bio${i}`}>
        {text}
      </p>)} */}
    </div>
  </div>
}

export default StuffHardest;
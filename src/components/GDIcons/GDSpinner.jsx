import React from 'react'
export default function GDSpinner({className}) {
  return (
    <div className={className}>
        <img src='/assets/img/loading.png' className='object-cover w-full animate-spin'/>
    </div>
  )
}

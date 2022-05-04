import React from 'react'
import {FiArrowRight} from 'react-icons/fi';

const User = ({name}) => {
  return (
    <div className='hover:bg-[rgba(0,106,255,0.5)] p-2 rounded-[5px] h-full w-[40%] ml-8 flex items-center justify-between'>
      <h1 className='text-xl'>{name}</h1>
      <FiArrowRight className='text-[#006aff] text-2xl'/>
    </div>
  )
}

export default User
import React from 'react'
import {FiArrowRight} from 'react-icons/fi';

const User = ({name, picture}) => {
  return (
    <div className='border-b hover:bg-[rgba(0,106,255,0.5)] p-2 rounded-[5px] h-full w-[40%] ml-8 flex items-center gap-5'>
      <img
        className='w-16 h-16 rounded-full border' 
        src={picture || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'} 
        alt=""
      />
      <h1 className='text-2xl font-base'>{name}</h1>
      <FiArrowRight className='text-[#006aff] text-2xl'/>
    </div>
  )
}

export default User
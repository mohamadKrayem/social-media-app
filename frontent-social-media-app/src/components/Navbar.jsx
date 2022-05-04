import React from 'react'
import { Outlet, Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <div className='flex items-center w-full h-16 justify-center gap-8 bg-[#066aff]'>
        <h1 className='text-3xl text-[orange] font-semibold font-mono'>BINARY</h1>
        <h1><Link to={'/community'}>community</Link></h1>
      </div>

      <Outlet />
    </div>
  )
}

export default Navbar
import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='flex w-full flex-col items-center gap-4'>
      <div className='text-4xl'>Welcome to <span className='text-[orange] font-semibold'>Binary</span></div>
      <button className='bg-[#066aff] text-white font-semibold py-1 text-xl py-1 px-4 border rounded-full'><Link to={'/signup'}>Sign up</Link></button>
      <button className='bg-[#066aff] text-white font-semibold py-1 text-xl py-1 px-4 border rounded-full'><Link to={'/signin'}>Sign in</Link></button>
    </div>
  )
}

export default Home;
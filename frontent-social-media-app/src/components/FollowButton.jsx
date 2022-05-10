import React from 'react'
import PropTypes from 'prop-types'
import { follow, unfollow } from '../operations/apiOperations'

const FollowButton = (props) => {

  function flw(){ props.onButtonClick(follow) }

  function unFlw(){ props.onButtonClick(unfollow) }

  console.log(props)

  return (
    <div>
      {
        props.following ?
        <button 
          onClick={unFlw}
          className='bg-[#066aff] text-white font-semibold py-1 text-xl py-1 px-4 border rounded-full'
        >
          Unfollow
        </button> :
        <button 
          onClick={flw}
          className='bg-[#066aff] text-white font-semibold py-1 text-xl py-1 px-4 border rounded-full'
        >
          flw
        </button>
      }
    </div>
  )
}

FollowButton.propTypes = {
  following: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func.isRequired
}

export default FollowButton;

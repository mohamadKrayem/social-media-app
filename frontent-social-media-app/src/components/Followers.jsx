import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const Followers = (props) => {

  console.log(props)
  return (
    <div className='flex items-center gap-4'>
      {
        props.people.map((person, i) => {
          if(i>=1 && person.id == props.people[i-1].id){
            return ;
          }else{
            return (<div key={person.id}>
              <Link to={'/user/'+person.id} className='flex flex-col items-center justify-center'>
                <img src={person.picture || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'} alt="" className='w-12 h-12 rounded-full border'/>
                <h1>{person.name}</h1>
              </Link>
            </div>)
          }
        })
      }
    </div>
  )
}

Followers.propTypes = {
  people: PropTypes.array.isRequired
}

export default Followers
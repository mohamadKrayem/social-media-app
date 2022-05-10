import React, {useEffect, useState} from 'react';
import { findPeople } from '../operations/apiOperations';
import { isAuthenticated } from '../authOperations/authStore';

const FindPeople = () => {
  const jwt = isAuthenticated();
  const [values, setValues]= useState({})

  useEffect(()=>{
    const abortController = new AbortController();
    const signal = abortController.signal;

    findPeople({
      userId: jwt.user._d
    }, {
      t: jwt.token
    }, signal).then(data=>{
      if(data && data.error) console.log(data.error)
      else setValues({...values, users:data})
    })
    return function cleanup() {
      abortController.abort();
    }
  }, [])

  return (
    <div>FindPeople</div>
  )
}

export default FindPeople
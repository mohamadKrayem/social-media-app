import { list } from '../operations/apiOperations';
import React, {useEffect, useState} from 'react'
import User from '../components/User';
import { Link } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function getData(){
      await list(signal).then(data=>{
        console.log('data', data);
        setUsers(data);
      });
    }

    getData();
    return function cleanup(){
      abortController.abort();
    }
  },[])
  return (
    <div className='w-full flex flex-col gap-2'>
      {
        users.map((item,i)=>(
          <Link to={'/user/'+item._id} key={item._id}>
            <User name={item.name} picture={item.picture}/>
          </Link>
        ))
      }
    </div>
  )
}

export default Users
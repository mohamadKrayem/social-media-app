import React, {useEffect, useState} from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { deleteJWT, isAuthenticated } from '../authOperations/authStore';
import { read, remove } from '../operations/apiOperations';

const Profile = () => {
  const params = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const jwt = isAuthenticated();

    read({
      userId: params.userId
    }, {t: jwt.token}, signal).then(data=>{
      if(data && data.error) return ;
      else setUser(data)
    })

    return function cleanup(){ abortController.abort()}
  }, [params.userId]);

  async function deleteAccount(){
    const jwt = isAuthenticated();
    const data = await remove({ userId: params.userId }, { t: jwt.token });
    if (data && data.error)
      console.log(data.error);
    else {
      deleteJWT(() => console.log('deleted'));
    }
  }
  
  return (
    <div className='h-full mt-16 border shadow gap-3 p-4 w-80 shadow-lg rounded-lg flex items-center justify-center flex-col'>
      <img 
        src={user.picture || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
        className="w-48 h-48 my-auto rounded-2xl"
      />
      <h1 className='text-[#000] text-2xl font-semibold '>{user.name}</h1>

      <h1 className='text-[#000] font-semibold '>Joined: {new Date(user.userCreated).toDateString()}</h1>
      {console.log('the user', isAuthenticated().user._id )}
      {isAuthenticated().user && isAuthenticated().user._id == user._id && (
        <>
          <button 
            className='px-3.5 py-2 border rounded-lg my-auto bg-[#006aff] text-white text-2xl font-semibold'
          >
            <Link to={"/user/edit/"+user._id}>Edit</Link>
          </button>
          <button 
            className='px-3.5 py-2 border rounded-lg my-auto bg-[rgb(255,0,43)] text-white text-2xl font-semibold'
            onClick={deleteAccount}
          >
            <Link to={'/'}>Delete</Link>
          </button>
        </>
      )}
    
    </div>
  )
}

export default Profile
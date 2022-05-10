import { toHaveFormValues } from '@testing-library/jest-dom/dist/matchers';
import React, {useEffect, useState} from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { deleteJWT, isAuthenticated } from '../authOperations/authStore';
import FollowButton from '../components/FollowButton';
import Followers from '../components/Followers';
import { read, remove } from '../operations/apiOperations';

const Profile = () => {
  const params = useParams();
  const [user, setUser] = useState({});
  const jwt = isAuthenticated();
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);

  function checkFollow(user){
    const match = user.followers.some(follower=> {
      return follower._id == jwt.user._id
    })
    return match
  }

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({
      userId: params.userId
    }, {t: jwt.token}, signal).then(async data=>{
      if(data && data.error) return data ;
      else {
        let following = checkFollow(data)
        setUser({...data, following: following})
        console.log('the data is ',data);
        return data
      }
    }).then((data)=>{
        console.log('user ', data.following)
        if(data.following.length==0) return data;
        else {
          data.following.forEach(async flwg => {
            console.log('flwg ',flwg)
            await read({userId: flwg._id}, {t: jwt.token}, signal).then(data => {
              console.log('following data ',data)
              setFollowing(()=>{
                return [...following, {
                  id: data._id,
                  name: data.name,
                  picture: data.picture
                }]
              })
                
            })
          })
        }
        return data;
    }).then(async data=> {
      console.log('the last data ', data)
      if(data.followers.length == 0) return data ;
      else{
        await data.followers.forEach(async flwg => {
          console.log('flwg ',flwg)
          await read({userId: flwg._id}, {t: jwt.token}, signal).then(data => {
            console.log('followers data ',data)
            setFollowers((followers) => {
              return [...followers, {
                id: data._id,
                name: data.name,
                picture: data.picture
              }];
            })
          })
        })
      }
      console.log('following ',followers)
      return data
    }).then(()=> {console.log('the last result  ',followers)})

    return function cleanup(){ abortController.abort()}
  }, [params.userId]);

  async function deleteAccount(){
    const data = await remove({ userId: params.userId }, { t: jwt.token });
    if (data && data.error)
      console.log(data.error);
    else {
      deleteJWT(() => console.log('deleted'));
    }
  }

  function clkFlwBtn(callApi){
    callApi({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, user._id).then(data=>{
      setUser({...user, following: !user.following})
    })
  }

  
  
  return (
    <div className='h-full mt-16 border shadow p-4 w-[80%] shadow-lg rounded-lg flex'>

      <div className='flex flex-col justify-between gap-9 h-full'>
        <div>
          <h1 className='text-2xl font-semiBold'>Followers:</h1>
          <Followers people={followers.length == 0 ? [] : followers} />
        </div>
        <div>
          <h1 className='text-2xl font-semiBold'>Following:</h1>
          <Followers people={following.length == 0? [] : following} />
        </div>
      </div>

      <div className='flex items-center justify-center m-auto flex-col gap-3'>
        <img 
          src={user.picture || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
          className="w-48 h-48 my-auto rounded-2xl"
        />
        <h1 className='text-[#000] text-2xl font-semibold '>{user.name}</h1>

        <h1 className='text-[#000] font-semibold '>Joined: {new Date(user.userCreated).toDateString()}</h1>

        <p>About: {user.about}</p>

        <FollowButton following={user.following} onButtonClick={clkFlwBtn} />

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
    </div>
  )
}

export default Profile
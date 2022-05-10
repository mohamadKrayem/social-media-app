import axios from "axios"
const url = process.env.REACT_APP_BASE_URL;

const create = async (user) =>{
  
  return await axios.post(`${url}/api/users/` , user)
  .then(res=>{
    console.log(res)
    return res.data
  })
  .catch(err=> {console.log(err)})

}

const list = async (signal) =>{
  return await axios.get(`${url}/api/users/`, {
    signal: signal,
  })
  .then(res => res.data)
}

async function read(params, credentials, signal){
  try {
    const res = await axios.get(`${url}/api/users/${params.userId}`, {
      headers: {
        'Authorization': 'Bearer ' + credentials.t
      }
    });
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

const update = async (params, credentials, user) =>{
  
  return await axios.put(`${url}/api/users/${params}` , user, {
    headers:{
      'Authorization': 'Bearer ' + credentials.t
    }
  })
  .then(res=>{
    console.log(res)
    return res.data
  })
  .catch(err=> {console.log(err)})

}

async function remove(params, credentials){
  try {
    const res = await axios.delete(`${url}/api/users/${params.userId}`, {
      headers: {
        'Authorization': 'Bearer ' + credentials.t
      }
    });
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

async function follow(params, credentials, followId){
  let user = {userId: params.userId, followId: followId};

  return await axios.put(`${url}/api/users/follow/`, user, {
    headers:{
      'Authorization': 'Bearer ' + credentials.t
    }
  }).then(res=>{
    console.log(res);
    return res.data;
  }).catch(err => {
    console.log('err in the follow operation ',err);
  })
}

async function unfollow(params, credentials, unfollowId){
  let user = {userId: params.userId, unfollowId: unfollowId}

  return await axios.put(`${url}/api/users/unfollow/`, user, {
    headers: {
      'Authorization': 'Bearer ' + credentials.t
    }
  }).then(res => {
    console.log(res);
    return res.data;
  }).catch(err => {
    console.log('err in the unfollow operation ',err)
  })
}

async function findPeople(params, credentials, signal){
  return await axios.get(`${url}/api/users/findpeople/${params.userId}`, {
    headers:{
      'Authorization': 'Bearer '+ credentials.t
    }, signal
  }).then(res => {
    return res.data;
  }).catch(err=>{
    console.log('the error is in the findPeople ',err)
  })
}

export { list, remove, update, read, create, follow, unfollow, findPeople }
import axios from "axios"
const url = process.env.REACT_APP_BASE_URL;


// async function signin(user){
//   return await axios.post(`${url}/auth/signin/`, user,
//   {
//     withCredentials: true
//   })
//   .then(res=>{
//     console.log('res ',res);
//     return res.data
//   }).catch(err=>{
//     console.log(err);
//   })
// }

async function signin(user){
  console.log("hello world")
  try{
    let res = await axios({
      url: `${url}/auth/signin/`,
      method: 'post',
      data: user,
      withCredentials: true,
    });
    console.log('the ',res)
    let data = await res.data;
    console.log(data)
    return data;
  }catch(err){
    console.log(err);
  }
}
// const signin = async (user) => {
//   try {
//     let res = await fetch(`${url}/auth/signin/`, {
//       method: 'POST',
//       headers:{
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include',
//       body: JSON.stringify(user)
//     })
//     return await res.json();
//   }catch(err) {console.log(err)}
// }


function signout(){
  axios.get(`${url}/auth/signout/`)
  .then(res=>{
    console.log(res);
  }).catch(err=>{
    console.log(err);
  })
}

export { signin, signout };

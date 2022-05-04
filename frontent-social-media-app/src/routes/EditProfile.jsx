import React,{useState} from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { authenticate, isAuthenticated } from '../authOperations/authStore';
import {MdOutlineDone} from 'react-icons/md';
import { update } from '../operations/apiOperations';

const EditProfile = () => {

  const params = useParams();

  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    open: false,
    error: ''
  });

  function onChange(name){
    return function(event){
      setValues({...values, [name]: event.target.value})
    }
  }

  function onSubmit(e){
    e.preventDefault();
    const jwt = isAuthenticated();
    const user={
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };

    console.log('the jwt',jwt)

    update(params.userId,{t: jwt.token}, user).then(data=>{
      data.error ? setValues({...values, error: data.error}) : setValues({...values, error: '', open: true})
    })
  }

  if(isAuthenticated().user._id !== params.userId) return <Navigate to={"/community" } replace />

  return (
    <div className='flex flex-col items-center'>

      <h1 className='text-3xl mb-4 font-bold'>Edit Your Profile</h1>

      {
        !values.open &&
      <form 
        className='p-4 flex flex-col gap-4 mt-auto' 
        onSubmit={onSubmit}
      >
        <label className='w-full flex justify-between items-center'>
          <span className='mr-2 text-2xl'>Name: </span>
          <input 
            className="h-8 p-2 border border-[#121213] rounded-lg" 
            type='text' 
            name='Name' 
            value={values.name} 
            placeholder="Your Name"
            onChange={onChange('name')}
            required
          />
        </label>
        <label className='w-full flex justify-between items-center'>
          <span className='mr-2 text-2xl'>Email: </span>
          <input 
            className="h-8 p-2 border border-[#121213] rounded-lg" 
            type='email' 
            name='email' 
            value={values.email}
            placeholder="username@example.com"
            onChange={onChange('email')}
            required
          />
        </label>
        <label className='w-full flex justify-between items-center'>
          <span className='mr-2 text-2xl'>Password:</span>
          <input 
            className="h-8 p-2 border border-[#121213] rounded-lg" 
            type='password' 
            name='password' 
            value={values.password} 
            onChange={onChange('password')}
            placeholder="***************" 
            required
          />
        </label>

        <button type="submit" className='hover:bg-[rgba(0,106,255,0.5)] py-2.5 font-semibold mt-3 px-4 w-fit bg-[#006aff] w-min self-center text-xl rounded-lg text-white'>
          Edit
        </button>
      </form>
      }

      {
        values.open &&
        <div className='gap-4 bg-[rgba(0,255,21,0.5)] p-3 flex items-center flex-col rounded-lg text-2xl font-semibold'>
          <p>
            <MdOutlineDone className='text-green text-xl'/> go back to your profile
          </p> 
          <button className='bg-[rgba(0,106,255,1)] p-2 rounded-lg text-xl font-semibold text-white'><Link to={'/user/'+params.userId}>Profile</Link></button>
        </div>
      }
    </div>
  )
}

export default EditProfile
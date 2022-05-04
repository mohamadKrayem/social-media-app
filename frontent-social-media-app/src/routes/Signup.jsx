import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { create } from '../operations/apiOperations';

const Signup = () => {

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
    const user={
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };

    create(user).then(data=>{
      data.error ? setValues({...values, error: data.error}) : setValues({...values, error: '', open: true})
    })
  }

  return (
    <div className='flex flex-col items-center'>

      <h1 className='text-3xl mb-4 font-bold'>Sign Up</h1>

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
          Submit
        </button>
      </form>
      }

      {
        values.open &&
        <div className='gap-4 bg-[rgba(0,255,21,0.5)] p-3 flex items-center flex-col rounded-lg text-2xl font-semibold'>
          <p>
          New Account successfully created
          </p> 
          <button className='bg-[rgba(0,106,255,1)] p-2 rounded-lg text-xl font-semibold text-white'><Link to={'/signin'}>Sign in</Link></button>
        </div>
      }
    </div>
  )
}

export default Signup;
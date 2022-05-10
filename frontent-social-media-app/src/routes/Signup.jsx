import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { create } from '../operations/apiOperations';
import axios from 'axios';
import {HiPlusCircle} from 'react-icons/hi'

const Signup = () => {

  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    open: false,
    error: '',
    about:'',
    picture: ''
  });

  const [image, setImage] = useState();
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  function onChange(name){
    return function(event){
      setValues({...values, [name]: event.target.value})
    }
  }

  async function onSubmit(e){
    e.preventDefault();

    const url = await uploadImage();

    const user={
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
      about: values.about || undefined,
      picture: url || undefined
    };

    create(user).then(data=>{
      data.error ? setValues({...values, error: data.error}) : setValues({...values, error: '', open: true})
    })
  }

  function validateImage(event){
    let file = event.target.files[0];
    if(file.size >= 1048576) return alert("the images's size must be 1mb or less");
    else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function uploadImage(){
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'xcyamjmn')
    let url = '';

    setUploading(true);
    await axios.post("https://api.cloudinary.com/v1_1/dcr7zxnmn/image/upload",
    data
    ).then(response => {
      setValues({...values, picture:response.data.secure_url});
      url = response.data.secure_url;
      console.log(url);
    })
    .then(()=>{setUploading(false)})
    .catch(error=> {console.log('the error ',error)})
    
    return url;
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

        <label htmlFor='image' className='self-center'>
          <img className='inline border-[#006aff] border object-cover w-20 h-20 mr-2 rounded-full' src={imagePreview ||"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} alt="Profile image"/>
          <span><HiPlusCircle className='w-6 h-6 translate-x-14 -translate-y-4 text-[#006aff]' /></span>
          <input type="file" id="image" hidden accept='image/png, image/jpg, image/jpeg' onChange={validateImage} />
        </label>

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
          <span className='mr-2 text-2xl'>About: </span>
          <input 
            className="h-8 p-2 border border-[#121213] rounded-lg" 
            type='text' 
            name='Name' 
            value={values.about} 
            placeholder="Description"
            onChange={onChange('about')}
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
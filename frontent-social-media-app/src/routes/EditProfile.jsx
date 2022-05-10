import React,{useState, useEffect} from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { authenticate, isAuthenticated } from '../authOperations/authStore';
import {MdOutlineDone} from 'react-icons/md';
import { update, read } from '../operations/apiOperations';
import axios from 'axios';
import {HiPlusCircle} from 'react-icons/hi';

const EditProfile = () => {

  const params = useParams();
  const [theUser, setUser] = useState({});
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState([]);
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const jwt = isAuthenticated();

    read({
      userId: params.userId
    }, {t: jwt.token}, signal).then(data=>{
      if(data && data.error) return ;
      else {
        setUser(data)
        setImagePreview(data.picture)
      }
    })

    return function cleanup(){ abortController.abort()}
  }, [params.userId]);

  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    open: false,
    error: '',
    about:'',
    picture: ''
  });

  function onChange(name){
    return function(event){
      setValues({...values, [name]: event.target.value})
    }
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

  async function onSubmit(e){
    e.preventDefault();
    const jwt = isAuthenticated();
    const url = await uploadImage();
    const user={
      name: values.name || theUser.name || undefined,
      email: values.email || theUser.email || undefined,
      password: values.password || theUser.password || undefined,
      picture: url || theUser.picture || undefined,
      about: values.about || theUser.about || undefined
    };
    console.log("the about is ",user)

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

        <label htmlFor='image' className='self-center'>
          <img 
            className={`inline border-[#006aff] border object-cover w-20 h-20 mr-2 rounded-full ${uploading?'blur-sm':''}`}
            src={imagePreview ||"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
            alt="Profile image"
          />
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
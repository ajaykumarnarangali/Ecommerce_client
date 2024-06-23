import { Button, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {setUser} from '../redux/user/userSlice'

function Login() {

  const ProfileLogo = "https://cdn-icons-png.flaticon.com/512/5951/5951752.png";
  const [showPassword, setShowpassword] = useState(false);

  const navigate=useNavigate();
  const dispatch=useDispatch();

  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit=async(e)=>{
    e.preventDefault();
   try {
    const res=await fetch('/api/auth/sign-in',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(form)
    }); 

    const data=await res.json();

    if(data.success==false){
      toast.error(data.message);
      return;
    }
    dispatch(setUser(data.user))
    toast.success("Login successfully!")
    navigate('/');

   } catch (error) {
     toast.error(error.message)
   }
  }


  return (
    <section>
      <div className=' max-w-lg mt-0 mx-auto bg-white pt-6 lg:mt-10 mb-5 rounded-md'>
        <h1 className='text-lg font-semibold text-center'>Login</h1>
        <div className='flex justify-center mt-6'>
          <img src={ProfileLogo} className='w-32' alt="" />
        </div>
        <form className='flex flex-col p-5 gap-5' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-2'>
            <label>Email:</label>
            <TextInput placeholder='email' className='w-full' onChange={(e) => { setForm({ ...form, email: e.target.value }) }} />
          </div>
          <div className='flex flex-col gap-2'>
            <label>Password:</label>
            <div className='flex items-center relative'>
              <TextInput placeholder='Password' type={showPassword ? 'text' : 'password'} className='w-full'
                onChange={(e) => { setForm({ ...form, password: e.target.value }) }} />
              {
                showPassword ?
                  <FaEyeSlash onClick={() => setShowpassword(false)} className='absolute right-4' />
                  :
                  <FaEye onClick={() => { setShowpassword(true) }} className='absolute right-4' />
              }
            </div>
          </div>
          <div className='flex flex-col my-3 gap-2'>
            <Button gradientDuoTone={'purpleToPink'} outline type='submit'>Login</Button>
            <p className='text-sm'>
              You don't have an account?<span className='text-blue-500 cursor-pointer'>
                <Link to='/sign-up'>
                  Sign Up
                </Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Login

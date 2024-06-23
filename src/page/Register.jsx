import { Button, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import ImageTobase from '../helpers/ImageTobase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Register() {

  const profileLogo ="https://cdn-icons-png.flaticon.com/512/5951/5951752.png";
  const [showPassword, setShowpassword] = useState(false);
  
  const navigate=useNavigate();

  const fileRef=useRef()

  const [form, setForm] = useState({ email: '', username: '', password: '', profileImage: '' });

  const handleImage=async(e)=>{
    const file=e.target.files[0];
    const base_64=await ImageTobase(file);

    //by using callbacks
    // ImageTobase(file,(res)=>{
    //   setProfileLogo(res)
    // })
    setForm({...form,profileImage:base_64});
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res=await fetch('/api/auth/sign-up',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(form)
      })
      const data=await res.json();
      if(data.success===false){
        console.log(data.message);
        toast.error(data.message);
        return
      }
      toast.success("user registered successfully!!")
      navigate('/sign-in');      
    } catch (error) {
      console.log(error)
      console.log(error)
    }
  }

  return (
    <section>
      <div className=' max-w-lg mt-0 mx-auto bg-white pt-6 lg:mt-10 mb-5 rounded-md'>
        <h1 className='text-lg font-semibold text-center'>Register</h1>
        <form className='flex flex-col p-5 gap-4' onSubmit={handleSubmit}>
          <div className='flex justify-center'>
            <img src={form?.profileImage || profileLogo} className='w-32 rounded-full' alt="" onClick={()=>{fileRef.current.click()}} />
            <input type="file" className='hidden' ref={fileRef} onChange={handleImage}/>
          </div>
          <div className='flex flex-col gap-2'>
            <label>Email:</label>
            <TextInput placeholder='Email' className='w-full' onChange={(e) => { setForm({ ...form, email: e.target.value }) }} />
          </div>
          <div className='flex flex-col gap-2'>
            <label>Username:</label>
            <TextInput placeholder='username' className='w-full' onChange={(e) => { setForm({ ...form, username: e.target.value }) }} />
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
            <Button gradientDuoTone={'purpleToPink'} outline type='submit'>Sign Up</Button>
            <p className='text-sm'>
              You don't have an account?<span className='text-blue-500 cursor-pointer'>
                <Link to='/sign-in'>
                  Sign In
                </Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Register

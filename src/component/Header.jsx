import React, { useEffect, useState } from 'react'
import { GrSearch } from 'react-icons/gr'
import { FaShoppingCart } from 'react-icons/fa'
import { Button, TextInput } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Dropdown, Avatar } from 'flowbite-react'
import { toast } from 'react-toastify'
import { setUser } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

function Header() {

  const { currentUser } = useSelector(state => state.user);
  const { count } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm,setSearchTerm]=useState("");

  const location=useLocation().search;
  useEffect(()=>{
    const urlParams=new URLSearchParams(location);
    const searchTermFromUrl=urlParams.get('searchTerm');
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl);
    }
  },[location]);

  const handleSignout = async () => {
    const res = await fetch('/api/auth/sign-out');
    const data = await res.json();
    if (data.success == false) {
      toast.error(data.message);
      return
    }
    dispatch(setUser(null));
    navigate('/');
  }

  const handleSearch=(e)=>{
    e.preventDefault();
    try {
      navigate(`/search?searchTerm=${searchTerm}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='h-16 shadow-md px-5 fixed top-0 right-0 left-0 z-40 bg-slate-200'>
      <div className='container mx-auto h-full flex items-center md:px-5 justify-between'>
        <div className=''>
          <Link to={'/'}>
            <div className='bg-gradient-to-r from-purple-600 via-violet-800 to-blue-600 p-2 rounded-lg'>
              <h1 className='text-white font-semibold text-lg'>Bangikko</h1>
            </div>
          </Link>
        </div>

        <div className='max-w-sm w-full hidden lg:block'>
          <form onSubmit={handleSearch}>
            <TextInput type='text' className=' w-full' rightIcon={GrSearch} value={searchTerm} onChange={(e)=>{setSearchTerm(e.target.value)}} />
          </form>
        </div>

        <div className='flex gap-5 items-center'>
          {
            currentUser &&
            <Link to={'/cart'}>
              <div className='text-3xl cursor-pointer flex relative'>
                <span>
                  <FaShoppingCart />
                </span>
                <div className='text-white bg-red-500 px-1 w-5 h-5 flex justify-center items-center rounded-full absolute left-5'>
                  <p className='text-sm'>{count}</p>
                </div>
              </div>
            </Link>
          }
          {
            currentUser &&
            <div className='text-3xl cursor-pointer'>
              <Dropdown arrowIcon={false} inline label={<Avatar img={currentUser?.profileImage} rounded className='border border-black rounded-full' />}>
                <Dropdown.Header>{currentUser?.email}</Dropdown.Header>
                {
                  currentUser && currentUser?.isAdmin &&
                  <Dropdown.Item>
                    <Link to={'/admin-panel/all-products'}>
                      Admin panel
                    </Link>
                  </Dropdown.Item>
                }
                <Dropdown.Item onClick={handleSignout}>
                  Sign out
                </Dropdown.Item>
                <Dropdown.Divider />
              </Dropdown>
            </div>
          }
          {
            !currentUser &&
            <div className='cursor-pointer'>
              <Link to={'/sign-in'}>
                <Button gradientDuoTone={'purpleToBlue'} size={'sm'}>Login</Button>
              </Link>
            </div>
          }

        </div>


      </div>
    </div>
  )
}

export default Header

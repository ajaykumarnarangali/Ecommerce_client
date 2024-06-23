import { Sidebar } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { HiUserGroup } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaEarthAsia } from "react-icons/fa6";

function Adminpanel() {

    const { currentUser } = useSelector(state => state.user);
    const location=useLocation().pathname;
    const [path,setPath]=useState('')

    useEffect(()=>{
        setPath(location);
    },[location])

    return (
        <div className='min-h-[calc(100vh-120px)] flex flex-col md:flex-row'>
            <div className='min-h-full md:max-w-64 w-full'>
                <Sidebar className="w-full">
                    <div className=" md:min-h-40 flex justify-center items-center cursor-pointer">
                        <div>
                            <img src={currentUser?.profileImage} alt={currentUser?.username} className="w-32 rounded-full" />
                            <p className="text-center mt-1 font-semibold">{currentUser?.username}</p>
                        </div>
                    </div>
                    <Sidebar.Items className="mt-5">
                        <Sidebar.ItemGroup className="flex flex-col gap-2">
                            <Link to={'all-users'}>
                                <Sidebar.Item as={'div'} active={path=='/admin-panel/all-users'} icon={HiUserGroup} labelColor={'dark'} className='cursor-pointer'>
                                    All users
                                </Sidebar.Item>
                            </Link>
                            <Link to={'all-products'}>
                                <Sidebar.Item as={'div'} active={path=='/admin-panel/all-products'} icon={FaEarthAsia}  labelColor={'dark'} className='cursor-pointer'>
                                   All product
                                </Sidebar.Item>
                            </Link>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
            </div>
            <div className="w-full h-full p-4">
                <Outlet />
            </div>
        </div>
    )
}

export default Adminpanel

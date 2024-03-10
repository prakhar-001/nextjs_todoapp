import React, { useContext } from 'react'
import Link from 'next/link'
import { Context, server } from '@/app/layout'
import axios from 'axios';
import toast from 'react-hot-toast';
import { CgProfile } from "react-icons/cg";


const Header = () => {

  const {isAuthenticated,setIsAuthenticated,loading,setLoading} = useContext(Context);


  const logoutHandler= async () => {
    setLoading(true);
    try {
      await axios.get(`${server}/users/logout`,
      {
        withCredentials:true, 
      });

      toast.success("Logged Out Successfully");
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.success(error.response.data.message)
      setIsAuthenticated(true);
    }
  };

  return (
    <div className='flex items-center justify-between sm:px-24 px-5 sm:h-10 h-[6vh] bg-blue-200'>
      <div>
        <h2>ToDo App</h2>
      </div>
      <div className='flex items-center gap-10'>
        <Link href={"/"}>Home</Link>
        {
          isAuthenticated? 
          <div className='flex items-center gap-10'>
            <button disabled={loading} onClick={logoutHandler}>LogOut</button>
            <Link href={"/profile"} className='text-2xl'><CgProfile /></Link>
          </div> : 
          <div>
            <Link href={"/login"}>Login</Link>
          </div>
        }
      </div>
    </div>
  )
}

export default Header
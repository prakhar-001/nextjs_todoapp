"use client"
import React, { useContext, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { Context, server } from '../layout'
import toast from 'react-hot-toast'
import { redirect } from 'next/navigation'

const page = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {isAuthenticated,setIsAuthenticated,loading,setLoading} = useContext(Context);

  const submitHandler= async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const {data} = await axios.post(`${server}/users/new`,
      {name, email, password}, 
      {headers: {
        "Content-Type": "application/json"
      },
      withCredentials:true, 
      });

      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.success(error.response.data.message)
      setIsAuthenticated(false);
    }
  };

  if(isAuthenticated) return redirect("/")

  return (
    <>
      <div className='flex flex-col items-center justify-between sm:px-24 py-10 w-full '> 
        <form action="" onSubmit={submitHandler} className='flex flex-col sm:gap-10 gap-7 sm:w-1/3 w-11/12 items-center bg-blue-100 sm:px-10 px-5 py-10 rounded-lg'>
          <div className='text-xl'>Register Now</div>
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Name' required className='border-2 border-slate-400 h-10 w-full rounded-lg p-2'/>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' required className='border-2 border-slate-400 h-10 w-full rounded-lg p-2'/>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' required className='border-2 border-slate-400 h-10 w-full rounded-lg p-2'/>
          <div className="flex flex-col items-center gap-3">
            <button disabled={loading} type='submit' className='bg-green-400 w-24 h-10 rounded-xl'>SignUp</button>
            <h4>Or</h4>
            <Link href={"/login"} className='text-blue-500'>Login</Link>
          </div>
        </form>
      </div>
    </>  )
}

export default page
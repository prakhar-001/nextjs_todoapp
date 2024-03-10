"use client"
import { useContext, useEffect, useState } from "react";
import { Context, server } from "./layout";
import axios from "axios";
import toast from "react-hot-toast";
import TodoItem from "../components/TodoItem";
import { redirect } from 'next/navigation'


export default function Home() {
  const {setUser, setIsAuthenticated, setLoading} = useContext(Context)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState("")
  const [tasks, setTasks] = useState([])
  const [refresh, setRefresh] = useState(true);

  const {isAuthenticated} = useContext(Context);

  const updateHandler = async (id) => {
    try {
      const {data} = await axios.put(`${server}/task/${id}`, {},{withCredentials: true})
      toast.success(data.message)
      setRefresh(prev => !prev)
    } catch (error) {
      // console.log(error)
      toast.error(error.response.data.message)
    }
  }
  const deleteHandler = async (id) => {
    try {
      const {data} = await axios.delete(`${server}/task/${id}`,{withCredentials: true})
      toast.success(data.message)
      setRefresh(prev => !prev)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    setLoading(true)
    axios.get(`${server}/users/me`, {
      withCredentials: true,
    }).then(res => {
      setUser(res.data);
      setIsAuthenticated(true);
      setLoading(false)
    }).catch((error) => {
      setUser({});
      setIsAuthenticated(false);
    })  

  }, [])

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true)
      const {data} = await axios.post(`${server}/task/new`, {
        title,description
      },{
        withCredentials: true,
        headers: {
          "Content-Type" : "application/json",
        },
      });
      setTitle("");
      setDescription("");
      toast.success(data.message);
      setIsLoading(false)
      setRefresh((prev) => !prev)
    } catch (error) {
      toast.error(error.response.data.message)
      setIsLoading(false)
    }
  }
  
  useEffect(() => {
    axios.get(`${server}/task/my`,{
      withCredentials: true,
    }).then(res => {
      setTasks(res.data.tasks)
    }).catch((e) => {
      toast.error(e.response.data.message)
    })
  
  }, [refresh])
  
  if(!isAuthenticated) return redirect("/login")

  return (
    <main className="flex flex-col items-center justify-between sm:px-24 py-5 gap-5">
      <div className="form sm:w-2/3 w-full px-5 ">
          <form onSubmit={submitHandler} className="flex flex-col gap-2 items-center bg-blue-100 p-3 rounded-lg">
            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Title' required className='border-2 border-slate-400 h-10 w-full rounded-lg p-2'/>
            <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder='Description' required className='border-2 border-slate-400 h-20 w-full rounded-lg p-2'/>
            <button disabled={isLoading} type='submit' className='bg-green-400 w-24 h-10 rounded-xl'>Add Task</button>
          </form>
      </div>
      <div className="todo-container flex flex-wrap w-full sm:px-0 px-5 ">
      {tasks.map((i) => (
          <div key={i.id} className="sm:w-1/4 w-full">
              <TodoItem
              title={i.title}
              description={i.description}
              isCompleted={i.isCompleted}
              updateHandler={updateHandler}
              deleteHandler={deleteHandler}
              id={i._id}
              key={i._id}
            />
          </div>
        ))}
      </div>
    </main>
  );
}

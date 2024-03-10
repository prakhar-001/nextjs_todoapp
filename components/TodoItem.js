import React from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";


const TodoItem = ({
  title,
  description,
  isCompleted,
  updateHandler,
  deleteHandler,
  id,
}) => {
  return (
    <div  className="todo h-40 bg-blue-100 m-2 rounded-xl p-2 flex flex-col">
      <div className="flex justify-between items-center border-b-4 border-blue-400 p-1">
        <h4 className="font-semibold">{title}</h4>
        <div className="flex items-center gap-2">
          <input
            onChange={() => updateHandler(id)}
            type="checkbox"
            checked={isCompleted}
            className="size-5 rounded-2xl"
          />
          <button onClick={() => deleteHandler(id)} className='text-red-500 rounded-md flex items-center justify-center text-3xl hover:text-red-800'>
          <MdOutlineDeleteOutline />
          </button>
        </div>
      </div>
      <div className="">
        <p className="break-words">{description}</p>
      </div>
    </div>
  );
};

export default TodoItem;

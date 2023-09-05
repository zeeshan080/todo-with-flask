"use client";
import { useModalStore, useTaskStore } from "@/app/store/store";
import { Task } from "@/app/types/common";
import { useEffect, useRef, useState } from "react";


export default function AddTask() {
  const { data }  = useModalStore();
 
  const buttonName = data.btnName
  const { isOpen, closeModal } = useModalStore();
  const modalRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const { allTask, getAllTasks,addTask,updateTask } = useTaskStore();

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };
  const handleAddSubmit = () => {
    if (title !== "" || date !== "") {
      let id:string = "0";
      allTask.length === 0 ? id = "0" : id = allTask[allTask.length - 1].id
      const newTask: Task = {
        id: String(Number(id) + 1),
        title: title,
        date: date,
        status: false
      };
      addTask(newTask);
      setTitle("");
      setDate("");
      closeModal();
      getAllTasks();
    }else{
    console.log("enter values");
    }
  };
  const handleUpdateSubmit = () => {

    if (title !== "" || date !== "") {
      const newTask: {title: string,date:string} = {
        title: title,
        date: date,
      };
      updateTask(newTask,data.id);
      setTitle("");
      setDate("");
      closeModal();
      getAllTasks();
    }else{
    console.log("enter values");
    }
  };
  useEffect(() => {
   setTitle(data.title)
   setDate((data.date))
  }, [data]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, closeModal]);

  return (
    <div
      className={
        isOpen
          ? "absolute bottom-0 lg:top-0 lg:left-0 flex items-end lg:items-center justify-center w-full h-full z-40 bg-black/40"
          : "hidden"
      }
    >
      <div
        ref={modalRef}
        className="relative  w-full lg:w-[40%] bg-white shadow-lg rounded-lg"
      >
        <div className="text-center p-4">
          <h1>ADD TASK</h1>
        </div>
        <div className="flex flex-col gap-y-4 py-4 px-6 rounded-[6px] ">
          <div className="flex flex-col">
            <label>Task</label>
            <input
              onChange={handleTitle}
              value={title}
              placeholder="Enter Task"
              className="border-[1px] border-gray-200 py-2 px-3 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label>Date</label>
            <input
              onChange={handleDate}
              value={date}
              className="border-[1px] border-gray-200 py-2 px-3 rounded-md"
              type="date"
            />
          </div>
          <button
           
            onClick={ buttonName === 'ADD' ? handleAddSubmit : handleUpdateSubmit}
            className="px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-950"
          >
            {buttonName}
          </button>
        </div>
      </div>
    </div>
  );
}

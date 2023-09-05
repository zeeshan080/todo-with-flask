"use client";
import { useTaskStore } from "../store/store";

type Props = {
  title: string;
  icon: React.ReactNode;
  className: string;
  handleActive: (title:string)=> void;
};

export default function Item({ title,className, icon,handleActive }: Props) {
    const {getAllTasks,currentTask,completedTask,changePage} = useTaskStore()

  const handleSelected = (title:string) => {
    const titleLower = title.toLowerCase()
    if(titleLower === 'all tasks'){
        getAllTasks()
        changePage(titleLower)
        handleActive(titleLower)

    }
    else if (titleLower === "today"){ 
        currentTask()
        changePage(titleLower)
        handleActive(titleLower)
    }
    else if(titleLower === "completed"){
        completedTask()
        changePage(titleLower)
        handleActive(titleLower)
    }
    else if(titleLower === "categories"){
        handleActive(titleLower)
        changePage(titleLower)
        alert("currently working on it.")

    }
  };
  return (
    <li>
      <button
        className={`flex flex-col items-center justify-center w-12 py-1 ${className}`}
        onClick={() => handleSelected(title)}
      >
        {icon}
        <span className={`text-[9px]`}>{title}</span>
      </button>
    </li>
  );
}

"use client";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { Task } from "../types/common";
import { useTaskStore, useModalStore } from "../store/store";

type Props = {
  task: Task;
};

export default function SingleTask({ task }: Props) {
  const { deleteTask, toggleStatus, getAllTasks } = useTaskStore();
  const { openModal } = useModalStore();

  return (
    <li className="flex items-center justify-between gap-5 bg-white shadow-lg py-4 px-5 mb-3 rounded-[5px] snap-y">
      <input
        onChange={() => toggleStatus(task.id)}
        type="checkbox"
        className="w-[7%]"
        checked={task.status}
      />
      <h3
        className={`text-slate-950 text-[12px] w-[90%] ${
          task.status ? "line-through" : ""
        }`}
      >
        {task.title}
      </h3>

      <div className="flex  gap-5">
        <button
          onClick={() =>
            openModal({
              id: task.id,
              title: task.title,
              date: task.date,
              btnName: "UPDATE",
            })
          }
          className={"w-[5%] hover:scale-110"}
        >
          <FiEdit className={"w-[15px] h-[15px] stroke-[#5e5e5e]"} />
        </button>
        <button
          onClick={() => {
            deleteTask(task.id);
            getAllTasks();
          }}
          className="w-[5%] hover:scale-110"
        >
          <MdDeleteOutline className="w-[20px] h-[20px] fill-[#991b1b]" />
        </button>
      </div>
    </li>
  );
}

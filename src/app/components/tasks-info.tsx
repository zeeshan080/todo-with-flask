"use client";
import SingleTask from "./single-tasks";
import { useTaskStore } from "../store/store";
import { Task } from "../types/common";
import { useEffect } from "react";

export default function TaskInfo() {
  const { getAllTasks, query, allTask, page, currentTask, completedTask } =
    useTaskStore();

  useEffect(() => {
    if (page === "all tasks") {
      getAllTasks();
    } else if (page === "today") {
      currentTask();
    } else if (page === "completed") {
      completedTask();
    }
  }, []);
  return (
    <div className="w-full lg:w-[38%] bg-gray-400 p-8 rounded-[6px] h-[73%] overflow-y-scroll text-center">
      <div>
        <ul>
          {query === "" && allTask.length === 0
            ? "No Task added here yet."
            : allTask.map((singleTask: Task) => {
                return <SingleTask key={singleTask.id} task={singleTask} />;
              })}
        </ul>
      </div>
    </div>
  );
}

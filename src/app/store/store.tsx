import { create } from "zustand";
import { Task } from "../types/common";

type ModalStore = {
  isOpen: boolean;
  data: any;
  openModal: (data: {
    id: string;
    title: string;
    date: string;
    btnName: string;
  }) => void;
  closeModal: () => void;
};

type TaskStore = {
  allTask: Task[];
  page: string;
  query: string;
  searchText: (query: string) => void;
  getAllTasks: () => void;
  currentTask: () => void;
  completedTask: () => void;
  changePage: (page: string) => void;
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  updateTask: (task: { title: string; date: string }, id: string) => void;
  toggleStatus: (id: string) => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  data: { title: "", date: "" },
  openModal: (data: { title: string; date: string }) => {
    set({ isOpen: true, data });
  },
  closeModal: () => set({ isOpen: false }),
}));

const URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
  : "http://localhost:3000/api";

export const useTaskStore = create<TaskStore>((set, get) => ({
  allTask: [],
  query: "",
  page: "all tasks",
  searchText: (query: string) => {
    set((state) => ({
      allTask: state.allTask.filter((task) =>
      task.title.toLowerCase().includes(query.toLowerCase())
    )
    }));
   
  },
  getAllTasks: async () => {
    try {
      const response = await fetch(`${URL}/todos`, { method: "GET" });
      const todos = await response.json();
      set({ allTask: todos });
    } catch (error) {
      console.log(error);
    }
  },
  currentTask: () => {
    set((state) => ({
      allTask: state.allTask.filter(
        (task) =>
          new Date(task.date).toDateString() === new Date().toDateString()
      ),
    }));
  },
  completedTask: () => {
    set((state) => ({
      allTask: state.allTask.filter((task) => task.status === true),
    }));
  },
  addTask: async (newTask: Task) => {
    const response = await fetch(`${URL}/todos`, {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: { "Content-Type": "application/json" },
    });
    const todo = await response.json();

    if (todo.status === "200") {
      set((state) => ({
        allTask: [...state.allTask, todo.todo],
      }));
    }
  },
  deleteTask: async (id) => {
    const response = await fetch(`${URL}/todos/${id}`, { method: "DELETE" });
    const todo = await response.json();
    if (todo.status === "200") {
      set((state) => ({
        allTask: state.allTask.filter((task) => task.id !== id),
      }));
    }
  },
  updateTask: async (newTask: { title: string; date: string }, id: string) => {
    const response = await fetch(`${URL}/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify(newTask),
      headers: { "Content-Type": "application/json" },
    });
    const updatedItem = await response.json();
    if (updatedItem.status === "200") {
      set((state) => ({
        allTask: state.allTask.map((todo) =>
          todo.id === updatedItem.todo.id ? updatedItem.todo : todo
        ),
      }));
      
    }
  },
  toggleStatus: (id: string) => {
    set((state) => ({
      allTask: state.allTask.map((task) => {
        task.id === id ? (task.status = !task.status) : "";
        return task;
      }),
    }));
  },
  changePage: (page: string) => set({ page }),
}));

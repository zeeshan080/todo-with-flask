import { Rubik } from "next/font/google";
import MainNavbar from "./components/main-navbar";
import TaskInfo from "./components/tasks-info";
import Searchbar from "./components/searchbar";
const rubit = Rubik({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
});
export default function Home() {
  return (
    <main
      className={`h-screen ${rubit.className} flex flex-col justify-between items-center  w-full`}
    >
      {/* searchbar */}
      <Searchbar />
      {/* task area */}
      <TaskInfo />
      {/* bottom navbar */}
      <MainNavbar />
    </main>
  );
}

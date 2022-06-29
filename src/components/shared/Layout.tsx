import NavBar from "./NavBar/NavBar";
import { Outlet, Route } from "react-router-dom";

export default function Layout() {
  return (
    <div id="container" className="flex">
      <header className="h-screen w-16">
        <NavBar />
      </header>
      <div className="w-full flex">
        <main className="bg-main-bg w-3/4">
         <Outlet/>
        </main>
        <aside className="bg-red-400 w-1/4">
          <h1>This is the side bar</h1>
        </aside>
      </div>
    </div>
  )
}

import NavBar from "./NavBar/NavBar";

export default function Layout({mainContent, aside}: any) {
  return (
      <div id="container" className="flex">
        <header className="h-screen w-16">
          <NavBar />
        </header>
        <div className="w-full flex">
          <main className="bg-main-bg w-3/4">
            {mainContent}
          </main>
          <aside className="bg-red-400 w-1/4">
            {aside}
          </aside>
        </div>
      </div>
  )
}

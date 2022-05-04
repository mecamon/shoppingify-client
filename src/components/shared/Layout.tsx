import NavBar from "./NavBar/NavBar";

export default function Layout({children}: any) {
  return (
      <div id="container" className="flex">
        <header className="h-screen w-16">
          <NavBar />
        </header>
        <main className="bg-main-bg">
          {children}
        </main>
      </div>
  )
}

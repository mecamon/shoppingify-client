import NavBar from "./NavBar/NavBar"
import React from "react"
import { Outlet } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useList } from "../../providers/ListProvider"
import ListAside from "./ListAside/ListAside"
import CreateItemAside from "./CreateItemAside/CreateItemAside"

export default function Layout() {
  const { t } = useTranslation()
  const { asideMode } = useList()

  function currentAsideBar() {
    switch(asideMode) {
      case 'List':
        return <ListAside/>
      case 'CreatingItem':
        return <CreateItemAside />
    }
  }

  return (
    <div id="container" className="flex">
      <header className="h-screen w-16">
        <NavBar />
      </header>
      <div className="w-full flex">
        <main className="bg-main-bg w-3/4">
         <Outlet/>
        </main>
         {currentAsideBar()}
      </div>
    </div>
  )
}

import NavBar from "./NavBar/NavBar"
import React from "react"
import { Outlet } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useList } from "../../providers/ListProvider"
import ListAside from "../ListAside"
import CreateItemAside from "../AddItemAside"
import ItemInfoAside from "../ItemInfoAside"

const MAX_MOBILE_WIDTH = 768

export default function Layout() {
  const { t } = useTranslation()
  const { asideMode } = useList()
  const [isMobileMode, setIsMobileMode] = React.useState<boolean>(true)
  const [isShowingCart, setIsShowingCart] = React.useState<boolean>(false)
  
  React.useEffect(() => {
    responsiveHandler()
    addEventListener('resize', responsiveHandler)
    return () => {
      removeEventListener('resize', responsiveHandler)
    }
  }, [])

  function responsiveHandler() {
    if (window.innerWidth > MAX_MOBILE_WIDTH) {
      setIsMobileMode(false)
    }
    if (window.innerWidth < MAX_MOBILE_WIDTH) {
      setIsMobileMode(true)
    }
  }

  function currentAsideBar() {
    switch(asideMode) {
      case 'List':
        return <ListAside/>
      case 'CreatingItem':
        return <CreateItemAside />
      case 'ItemDetails':
        return <ItemInfoAside />
    }
  }

  return (
    <div id="container" className="flex">
      <header className="h-screen w-16">
        <NavBar toggleSideBarOnMobile={() => setIsShowingCart(prev => !prev)} />
      </header>
      <div className="w-full flex">
        <main
           className={ !isMobileMode 
            ? "bg-main-bg w-full md:w-3/5 xl:w-8/12 2xl:w-9/12"
            : !isShowingCart 
            ? "bg-main-bg w-full block"
            : "bg-main-bg w-full hidden"
          }
          >
          <Outlet/>
        </main>
        <aside 
          className={ !isMobileMode 
            ? "relative h-full w-full md:w-2/5 xl:w-4/12 2xl:w-3/12"
            : isShowingCart
            ? "relative h-full w-full block"
            : "relative h-full w-full hidden"
          }
          >
          {currentAsideBar()}
        </aside>
      </div>
    </div>
  )
}

import NavBar from "./NavBar/NavBar"
import React from "react"
import { Outlet } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useList } from "../../providers/ListProvider"
import ListAside from "../ListAside"
import CreateItemAside from "../AddItemAside"
import ItemInfoAside from "../ItemInfoAside"
import ConfirmationModal from "./ConfirmationModal/ConfirmationModal"
import { useModal } from "../../providers/ModalProvider"

const MAX_MOBILE_WIDTH = 768

export default function Layout() {
  const { t } = useTranslation()
  const { asideMode } = useList()
  const { displayingType, getModalContent } = useModal()
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
    <div id="container" className="h-screen">
      { displayingType !== 'none' &&
        <ConfirmationModal>
          {getModalContent()}
        </ConfirmationModal>
      }
      <header className="h-screen w-16">
        <NavBar toggleSideBarOnMobile={() => setIsShowingCart(prev => !prev)} />
      </header>
      <main
          className={ !isMobileMode 
          ? "layout-main"
          : !isShowingCart 
          ? "layout-main block"
          : "layout-main hidden"
        }
        >
        <Outlet/>
      </main>
      <aside 
        className={ !isMobileMode 
          ? "layout-aside"
          : isShowingCart
          ? "layout-aside block"
          : "layout-aside hidden"
        }
        >
        {currentAsideBar()}
      </aside>
    </div>
  )
}

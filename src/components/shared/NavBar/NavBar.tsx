import {NavLink} from "react-router-dom";
import React from "react"
import Logo from "../../../assets/logo.svg"
import NavItem from "../NavItem/NavItem";
import { useList } from "../../../providers/ListProvider";

export default function NavBar({toggleSideBarOnMobile}: Props) {
  const { active } = useList()
  return (
      <nav className="flex flex-col justify-between items-center h-full w-full py-8">
        <NavLink to="/">
          <img src={Logo} data-testid="logo" alt="logo"/>
        </NavLink>
        <ul className="w-full">
          <NavItem
              icon={<span id="link-icon" className="material-icons text-icons text-2xl text-center w-full">list</span>}
              path="/items"
              dataTestId="items-nav"
              label="Items"
          />
          <NavItem
              icon={<span className="material-icons text-icons text-2xl text-center w-full">history</span>}
              path="/items/history"
              dataTestId="history-nav"
              label="History"
          />
          <NavItem
              icon={<span className="material-icons text-icons text-2xl text-center w-full">insert_chart_outlined</span>}
              path="/items/statistics"
              dataTestId="statistics-nav"
              label="Statistics"
          />
        </ul>
        <div className="relative w-full h-24 flex flex-col justify-center items-center">
          <span
              className="absolute top-3 right-3 text-white block px-1.5 py-0.5 rounded-sm text-xs bg-warning" 
              data-testid="item-count" 
            >{active?.items?.length ?? 0}</span>
          <button 
            data-testid="cart" 
            className="bg-accent-2 h-10 w-10 rounded-full"
            onClick={() => toggleSideBarOnMobile()}
            >
            <span className="material-icons text-white mx-auto my-auto">shopping_cart</span>
          </button>
        </div>
      </nav>
  )
}

interface Props {
  toggleSideBarOnMobile: () => void
}
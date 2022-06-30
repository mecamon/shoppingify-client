import React from "react"
import { List } from "../models/models"

const ListContext = React.createContext<ListContextType>(null!)

export default function ListProvider({children}: {children: React.ReactNode}) {
  const [active, setActive] = React.useState<List>(null!)
  const [asideMode, setAsideMode] = React.useState<AsideBar>('List')
  const contextValue = React.useMemo(() => ({
    active,
    setActive,
    asideMode,
    setAsideMode,
  }), [active, asideMode])

  return (
    <ListContext.Provider value={contextValue} >
      {children}
    </ListContext.Provider>
  )
}

export function useList() {
  const context = React.useContext(ListContext)
  if (!context) {
    throw Error('list context needs to be initialized before using it')
  }
  return context
}

export interface ListContextType {
  active: List
  setActive: React.Dispatch<React.SetStateAction<List>>
  asideMode: AsideBar
  setAsideMode: React.Dispatch<React.SetStateAction<AsideBar>>
}

export type AsideBar = 'List' | 'CreatingItem' | 'ItemDetails'
import React from "react"
import { List } from "../models/models"

const ListContext = React.createContext<ListContextType>(null!)

export default function ListProvider({children}: {children: React.ReactNode}) {
  const [active, setActive] = React.useState<List>(null!)
  const [asideMode, setAsideMode] = React.useState<AsideBar>('List')
  const [isCompleting, setIsCompleting] = React.useState<boolean>(false)
  const contextValue = React.useMemo(() => ({
    active,
    setActive,
    asideMode,
    setAsideMode,
    isCompleting,
    setIsCompleting
  }), [active, asideMode, isCompleting])

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
  isCompleting: boolean, 
  setIsCompleting: React.Dispatch<React.SetStateAction<boolean>>
}

export type AsideBar = 'List' | 'CreatingItem' | 'ItemDetails'
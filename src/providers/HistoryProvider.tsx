import React, {  SetStateAction, useContext } from "react";
import { List, OldList } from "../models/models";

const HistoryContext = React.createContext<HistoryContextType>(null!)

export default function HistoryProvider({children}:{children: React.ReactNode}) {
  const [oldLists, setOldLists] = React.useState<OldList[]>(null!)
  const [selectedList, setSelectedList] = React.useState<List>(null!)

  const contextValue = React.useMemo<HistoryContextType>(() => ({
    oldLists,
    setOldLists,
    selectedList,
    setSelectedList
  }), [oldLists, selectedList])

  return (
    <HistoryContext.Provider value={contextValue}>
      {children}
    </HistoryContext.Provider>
  )
}

export function useHistory() {
  const context = useContext(HistoryContext)
  if (!context) {
    throw Error('history context needs to be initialized before using it')
  }
  return context
}

interface HistoryContextType {
  oldLists: OldList[]
  setOldLists: React.Dispatch<SetStateAction<OldList[]>> 
  selectedList: List
  setSelectedList: React.Dispatch<SetStateAction<List>>
}
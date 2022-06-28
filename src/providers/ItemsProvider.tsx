import React, {useContext, useMemo, useState} from "react";
import {GroupOfItemsByCat, Item} from "../models/models";

const ItemsContext = React.createContext<ItemsContextType>(null!)

export default function ItemsProvider({children}: {children: React.ReactNode}) {
  const [groups, setGroups] = useState<GroupOfItemsByCat[]>([])
  const [itemDetails, setItemDetails] = useState<Item>(null!)

  const contextValue = useMemo(() => ({
    groups,
    setGroups,
    itemDetails,
    setItemDetails,
  }), [groups, itemDetails])

  return (
      <ItemsContext.Provider value={ contextValue }>
        { children }
      </ItemsContext.Provider>
  )
}

export function useItems() {
  const context = useContext(ItemsContext)
  if (!context) {
    throw Error('items context needs to be initialized before using it')
  }
  return context
}

export interface ItemsContextType {
  groups: GroupOfItemsByCat[]
  setGroups: React.Dispatch<React.SetStateAction<GroupOfItemsByCat[]>>
  itemDetails: Item
  setItemDetails: React.Dispatch<React.SetStateAction<Item>>
}

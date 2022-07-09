import React, {useContext, useMemo, useState} from "react";
import { useErrorHandler } from "../hooks/useErrorHandler";
import {GroupOfItemsByCat, ItemDetailed} from "../models/models";
import ItemsEndpoints from "../services/rest-api/items";

const ItemsContext = React.createContext<ItemsContextType>(null!)

const ITEMS_TO_FETCH = 4

export default function ItemsProvider({children}: {children: React.ReactNode}) {
  const [groups, setGroups] = useState<GroupOfItemsByCat[]>([])
  const [itemDetails, setItemDetails] = useState<ItemDetailed>(null!)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [q, setQ] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pages, setPages] = useState<number[]>([])

  const { httpError } = useErrorHandler()

  React.useEffect(() => {
    ;(async() => {
      await getItems()
    })()
  }, [currentPage])

  React.useEffect(() => {
    ;(async() => {
      await getItems(q)
    })()
  }, [q])

  function setQAndSearch(q: string) {
    setQ(q)
  }

  function changePage(page: number) {
    setCurrentPage(page)
  }

  async function getItems(q: string = '') {
    setIsLoading(() => true)
    const take = ITEMS_TO_FETCH * currentPage
    const skip = (currentPage - 1) * ITEMS_TO_FETCH
    try {
      const res = await ItemsEndpoints.itemsByCategoryGroup(q, take, skip)
      setGroups(res.data)
      const pages = createPages(parseInt(res.headers['x-total-count']))
      setPages(pages)
    }catch (e: any) {
      httpError(e)
    } finally {
      setIsLoading(() => false)
    }
  }

  function createPages(count: number): number[] {
    const pages: number[] = []
    const pagesNumber: number = Math.ceil(count / ITEMS_TO_FETCH)

    for (let index = 0; index < pagesNumber; index++) {
      pages.push(index + 1)
    }
    return pages
  }

  const contextValue = useMemo(() => ({
    groups,
    itemDetails,
    setItemDetails,
    q,
    setQAndSearch,
    getItems,
    isLoading,
    pages,
    currentPage,
    changePage
  }), [groups, itemDetails, pages])

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
  itemDetails: ItemDetailed
  setItemDetails: React.Dispatch<React.SetStateAction<ItemDetailed>>
  q: string
  setQAndSearch: (q: string) => void
  getItems: (q: string) => Promise<void>
  isLoading: boolean
  pages: number[]
  currentPage: number
  changePage: (page: number) => void
}

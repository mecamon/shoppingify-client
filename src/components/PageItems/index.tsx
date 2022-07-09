import React from 'react'
import { useTranslation } from "react-i18next"
import SearchBar from "./SearchBar/SearchBar"
import CategoriesGroups from "./CategoriesGroups/CategoriesGroups"
import ItemsEndpoints from '../../services/rest-api/items'
import { useItems } from '../../providers/ItemsProvider'
import { useErrorHandler } from '../../hooks/useErrorHandler'

export default function ItemsPage() {
  const { t } = useTranslation()
  const { setGroups } = useItems()
  const { httpError } = useErrorHandler()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function searchByName(q: string = '') {
    try {
      setIsLoading(true)
      const res = await ItemsEndpoints.itemsByCategoryGroup(q)
      setGroups(res.data)
    } catch(e: any) {
      httpError(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div id="main-content-container" className="mx-3 lg:mx-8 xl:mx-12 2xl:mx-24 mt-8">
        <div id="head" className="flex justify-between">
          <h2 className="text-2xl hidden lg:block lg:w-3/5 font-bold text-labels">
            <span className="text-accent-2">{t('title')}</span>
            { ' ' + t('itemsHeadMsg')}
          </h2>
          <div className="bg-white h-12 flex items-center w-full lg:w-2/5 xl:w-1/4 rounded-xl shadow-card px-3">
            <SearchBar fullTextSearch={searchByName} />
          </div>
        </div>
        <CategoriesGroups/>
      </div>
    </>
  )
}

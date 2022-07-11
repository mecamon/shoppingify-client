import React from 'react'
import { useTranslation } from "react-i18next"
import SearchBar from "./SearchBar/SearchBar"
import CategoriesGroups from "./CategoriesGroups/CategoriesGroups"
import Pagination from '../shared/Pagination'
import { useItems } from '../../providers/ItemsProvider'

export default function ItemsPage() {
  const { t } = useTranslation()
  const { groups } = useItems()

  return (
    <>
      <div id="main-content-container" className="mx-3 lg:mx-8 xl:mx-12 2xl:mx-24 mt-8 min-h-items-container">
        <div id="head" className="flex justify-between">
          <h2 className="text-2xl hidden lg:block lg:w-3/5 font-bold text-labels">
            <span className="text-accent-2">{t('title')}</span>
            { ' ' + t('itemsHeadMsg')}
          </h2>
          <div className="bg-white h-12 flex items-center w-full lg:w-2/5 xl:w-1/4 rounded-xl shadow-card px-3">
            <SearchBar />
          </div>
        </div>
        <CategoriesGroups/>
      </div>
      { groups !== null &&
        <div className="flex justify-center">
          <Pagination />
        </div>
      }
      
    </>
  )
}

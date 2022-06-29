import React from 'react'
import { useTranslation } from "react-i18next"
import SearchBar from "./SearchBar/SearchBar"
import CategoriesGroups from "./CategoriesGroups/CategoriesGroups"

export default function ItemsPage() {
  const { t } = useTranslation()

  

  return (
    <>
      <div id="main-content-container" className="mx-24 mt-8">
        <div id="head" className="flex justify-between">
          <h2 className="text-2xl font-bold text-labels">
            <span className="text-accent-2">{t('title')}</span>
            { ' ' + t('itemsHeadMsg')}
          </h2>
          <SearchBar fullTextSearch={null!} />
        </div>
        <CategoriesGroups/>
      </div>
    </>
  )
}

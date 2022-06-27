import React from "react";
import {useTranslation} from "react-i18next";

export default function SearchBar({fullTextSearch}: Props) {
  const { t } = useTranslation()

  function searchLike(e: any) {
    const value: string = e.target.value
    if (value.length > 2) {
      fullTextSearch()
    }
  }

  return (
      <div className="bg-white h-12 flex items-center w-1/3 rounded-xl shadow-card px-3">
        <span className="material-icons text-icons text-2xl">search</span>
        <input
            placeholder={ t('searchPlaceholder') }
            className="outline-0 w-10/12"
            type="text"
            name="search"
            data-testid="search-input"
            onInput={(e) => searchLike(e)}
        />
      </div>
  )
}

interface Props {
  fullTextSearch: Function
}

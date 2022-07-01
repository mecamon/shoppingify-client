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
    <>
      <span className="material-icons text-icons text-2xl">search</span>
      <input
          placeholder={ t('searchPlaceholder') }
          className="outline-0 w-10/12"
          type="text"
          name="search"
          autoComplete="off"
          data-testid="search-input"
          onInput={(e) => searchLike(e)}
      />
    </>
  )
}

interface Props {
  fullTextSearch: Function
}

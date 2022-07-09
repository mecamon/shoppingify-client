import React from "react";
import {useTranslation} from "react-i18next";
import { useItems } from "../../../providers/ItemsProvider";

export default function SearchBar() {
  const { t } = useTranslation()
  const { q, setQAndSearch } = useItems()

  async function searchByName(q: string = '') {
    setQAndSearch(q)
  }

  return (
    <>
      <span className="material-icons text-icons text-2xl">search</span>
      <input
          placeholder={ t('searchPlaceholder') }
          className="outline-0 w-10/12"
          type="text"
          name="search"
          value={q}
          autoComplete="off"
          data-testid="search-input"
          onChange={e => searchByName(e.target.value)}
      />
    </>
  )
}


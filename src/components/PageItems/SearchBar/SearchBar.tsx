import React from "react";
import {useTranslation} from "react-i18next";

export default function SearchBar({fullTextSearch}: Props) {
  const [value, setValue] = React.useState<string>('')
  const { t } = useTranslation()

  async function searchLike(value: string) {
    setValue(value)
    await fullTextSearch(value)
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
          value={value}
          onChange={async e => searchLike(e.target.value)}
      />
    </>
  )
}

interface Props {
  fullTextSearch: (value: string) => Promise<void>
}

import React from "react"
import { useTranslation } from "react-i18next"
import { Category } from "../../../models/models"

export default function CategoriesFound({
  categoriesSuggested, 
  createCategory, 
  selectCategory,
  categoryInputValue,
}: Props) {
  const { t } = useTranslation()

  return (
    <div className="w-full border border-disabled rounded-xl z-50 bg-white p-2 mt-3 absolute">
      {
        categoriesSuggested.map(cat => 
          <span 
            className="block cursor-pointer px-5 py-2 hover:bg-effect-bg text-lg text-autocomplete hover:text-common-text rounded-xl"
            data-testid="suggested-category"
            onClick={() => selectCategory(cat)} 
            key={cat.id}>{cat.name}</span>)
      }
      { categoryInputValue !== '' &&
        <>
          <hr className="my-2" />
          <span 
            className="block cursor-pointer px-5 py-2 hover:bg-effect-bg text-base text-accent-2 hover:text-common-text rounded-xl"
            data-testid="create-category"
            onClick={() => createCategory()}>
              { t("createCategory") + ' ' + categoryInputValue}
          </span>
        </>
      }
    </div>
  )
}

interface Props {
  categoryInputValue: string
  categoriesSuggested: Category[]
  createCategory: () => void
  selectCategory: (category: Category) => void
}
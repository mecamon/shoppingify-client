import React from "react"
import { useTranslation } from "react-i18next"
import { ItemDetailed } from "../../../models/models"
import FoodPlaceholder from "../../../assets/vegetable.png"

export default function ItemInfoMainContent({ itemDetails, backToList }: Props) {
  const { t } = useTranslation()
  
  return (
    <div className="flex flex-col bg-white h-full px-3 xl:px-11 py-8">
      <button 
        className="flex items-center mb-8" 
        data-testid="back-button"
        onClick={backToList}
        >
        <span className="material-icons text-lg text-accent-2 mr-2">keyboard_backspace</span>
        <span className="text-lg text-accent-2">{t("back")}</span>
      </button>
      <div className="flex items-center justify-center mb-8">
        { !itemDetails.image_url 
            ? <img className="rounded-3xl" data-testid="image" src={FoodPlaceholder}/>
            : <img className="rounded-3xl" data-testid="image" src={itemDetails.image_url}/>
        }
      </div>
      <div className="flex flex-col mb-8">
        <label className="text-xs text-disabled" htmlFor="name">{t("nameLabel")}</label>
        <span className="text-2xl" data-testid="name">{itemDetails.name}</span>
      </div>
      <div className="flex flex-col mb-8">
        <label className="text-xs text-disabled" htmlFor="category">{t("itemCategoryLabel")}</label>
        <span className="text-lg" data-testid="category-name">{itemDetails.category_name}</span>
      </div>
      <div className="flex flex-col mb-8">
        <label className="text-xs text-disabled" htmlFor="note">{t("note")}</label>
        <p className="text-lg" data-testid="note">{itemDetails.note}</p>
      </div>
    </div>
  )
}

interface Props {
  itemDetails: ItemDetailed
  backToList: () => void
}
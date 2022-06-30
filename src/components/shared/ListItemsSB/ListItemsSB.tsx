import React from "react"
import { useTranslation } from "react-i18next"
import { List } from "../../../models/models"
import Bottle from "../../../assets/source.svg"
import CartGirl from "../../../assets/undraw_shopping_app_flsj 1.svg"

export default function ListItemsSB({addItem, list}: Props) {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col bg-menu-bg h-full px-11 pb-11">
      <div className="w-full h-1/4 relative p-4">
        <img className="absolute top-0" src={Bottle} alt="bottle icon" />
        <div className=" w-full p-5 flex justify-end bg-accent-1 rounded-xl">
          {
            list !== null 
              ? <div className=" w-2/3">
                  <span className="block text-white mb-2">{ t("sbItemMessage") }</span>
                  <button 
                    className="bg-white hover:bg-slate-100 py-3 px-7 rounded-xl"
                    data-testid="add-item" 
                    onClick={() => addItem()}>{ t("addItem") }</button>
                </div>
              : <div className=" w-2/3">
                  <span 
                    className="block text-white mb-2"
                    data-testid="no-active-list"
                    >{ t("noListCreated") }</span>
                </div>
          }
        </div>
      </div>
      <div className="relative w-full h-3/4 flex flex-col items-center">
        { (list?.items?.length === 0 || list === null) &&
          <>
            <img className="absolute bottom-24 z-50" src={CartGirl} alt="girl with cart" />
            <div className="flex justify-center items-center h-full mb-40">
              <span data-testid="no-items">{ t("noItems") }</span> 
            </div>
          </>
        }
      </div>
    </div>
  )
}

interface Props {
  addItem: () => void
  list: List
}
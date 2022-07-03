import React from "react"
import { useTranslation } from "react-i18next"
import { useList } from "../../../providers/ListProvider"

export function AddItemTopArea() {
  const {active, setAsideMode} = useList()
  const { t } = useTranslation()
  return (
    <div className=" w-full p-5 flex justify-end bg-accent-1 rounded-xl">
      {
        active !== null 
          ? <div className=" w-2/3">
              <span className="block text-white mb-2">{ t("sbItemMessage") }</span>
              <button 
                className="bg-white hover:bg-slate-100 py-3 px-7 text-lg text-labels font-bold rounded-xl"
                data-testid="add-item" 
                onClick={() => setAsideMode('CreatingItem')}>{ t("addItem") }</button>
            </div>
          : <div className=" w-2/3">
              <span 
                className="block text-white mb-2"
                data-testid="no-active-list"
                >{ t("noListCreated") }</span>
            </div>
      }
    </div>
  )
}
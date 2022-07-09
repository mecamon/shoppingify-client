import React from "react"
import { useTranslation } from "react-i18next"
import { useList } from "../../../providers/ListProvider"

export default function ToggleEditCompleteButton() {
  const { isCompleting, setIsCompleting } = useList()
  const { t } = useTranslation()

  return (
    <div>
      { !isCompleting  
        ? <button 
            className="flex items-center rounded-3xl hover:opacity-90 bg-accent-3 text-white h-10 px-8 transition-colors duration-200 ease-in"
            onClick={() => setIsCompleting(prev => !prev)}
          >
            {t("check")}
          </button>
        :  <button 
            className="flex items-center rounded-3xl hover:opacity-90 bg-accent-3 text-white  h-10 px-8 transition-colors duration-200 ease-in"
            onClick={() => setIsCompleting(prev => !prev)}
          >
          {t("edit")}
        </button>
      }
    </div> 
  )
}
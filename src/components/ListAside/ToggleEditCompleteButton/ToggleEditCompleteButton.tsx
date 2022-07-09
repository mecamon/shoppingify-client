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
            className="flex items-center rounded-3xl bg-traslucid hover:bg-accent-3 hover:text-white h-10 px-4"
            onClick={() => setIsCompleting(prev => !prev)}
          >
            {t("check")}
            <span className="ml-2 material-icons text-labels text-2xl">done</span>
          </button>
        :  <button 
          className="flex items-center rounded-3xl bg-traslucid h-10 px-4"
          onClick={() => setIsCompleting(prev => !prev)}
          >
          {t("edit")}
          <span className="ml-2 material-icons text-labels text-2xl">edit</span>
        </button>
      }
    </div> 
  )
}
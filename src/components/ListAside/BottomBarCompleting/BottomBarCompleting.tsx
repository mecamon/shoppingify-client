import React from "react"
import { useTranslation } from "react-i18next"

export default function BottomBarCompleting({cancel, complete, isLoading}: Props) {
  const { t } = useTranslation()

  return (
    <div className="flex items-center justify-center w-full h-full">
        <div className="mx-2">
          <button className="flex justify-center min-w-details-sb-button items-center hover:opacity-80 bg-white text-base rounded-xl py-5"
            data-testid="cancel-button" 
            disabled={isLoading}
            onClick={async() => cancel()}>
              { !isLoading 
                  ? <span data-testid="button-label" >{ t("cancel") }</span>
                  : <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
              }
          </button>
        </div>
        <div className="mx-2">
          <button className="flex justify-center min-w-details-sb-button items-center hover:opacity-80 bg-accent-3 text-base text-white rounded-xl py-5"
            data-testid="complete-button" 
            disabled={isLoading}
            onClick={async() => complete()}>
              { !isLoading 
                  ? <span data-testid="button-label" >{ t("complete") }</span>
                  : <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
              }
          </button>
        </div>
      </div>
  )
}

interface Props {
  cancel: () => void
  complete: () => void
  isLoading: boolean
}
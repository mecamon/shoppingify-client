import React from "react"

export default function SBBottomBarButton({
  isLoading = false, 
  isDisabled = false,
  buttonLabel, 
  bgClassColor, 
  textClassColor = "text-common-text", 
  onClick }: Props) {
  return (
    <button
        className={ isLoading
          ? `relative flex justify-center items-center bg-disabled text-xl text-white rounded-xl px-10 py-5 transition-colors duration-500 ease-in` 
          : `relative flex justify-center items-center ${bgClassColor} text-xl ${textClassColor} rounded-xl px-10 py-5 transition-colors duration-500 ease-in` }
        data-testid="action-button" 
        disabled={isDisabled}
        onClick={ async () => onClick() }>
          <span 
            className={isLoading ? "absolute block invisible" : "absolute block visible"} 
            data-testid="button-label" >{ buttonLabel }</span>
          <div className={
              isLoading 
                ? "lds-ring absolute visible left-auto right-auto" 
                : "lds-ring absolute invisible left-auto right-auto" }>
            <div></div><div></div><div></div><div></div>
          </div>
    </button>
  )
}

interface Props {
  isLoading?: boolean
  isDisabled?: boolean
  buttonLabel: string
  bgClassColor: string
  textClassColor?: string
  onClick: () => void
}
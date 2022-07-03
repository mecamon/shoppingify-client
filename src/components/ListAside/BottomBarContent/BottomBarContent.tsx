import React from "react"

export default function SBBottomBarContent({onClick, placeholder, buttonLabel, isLoading}: Props) {
  const [inputValue, setInputValue] = React.useState<string>('')
  return (
    <div 
      className={inputValue === '' 
        ? "flex justify-between w-full h-full rounded-xl border-2 border-disabled transition-colors duration-500 ease-in" 
        : "flex justify-between w-full h-full rounded-xl border-2 border-accent-2 transition-colors duration-500 ease-in"}
      >
      <input 
        className="rounded-xl bg-transparent w-full outline-none text-xl" 
        data-testid="input-text"
        placeholder={ placeholder }
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type="text" />
      <button
        className={inputValue === '' || isLoading
          ? "relative flex justify-center items-center bg-disabled text-xl text-white rounded-xl px-10 py-5 transition-colors duration-500 ease-in" 
          : "relative flex justify-center items-center bg-accent-2 text-xl text-white rounded-xl px-10 py-5 transition-colors duration-500 ease-in" }
        disabled={inputValue === ''}
        data-testid="action-button" 
        onClick={async () => onClick(inputValue)}>
          <span className={isLoading ? "absolute invisible" : "absolute visible"}>{ buttonLabel }</span>
          <div className={
              isLoading 
                ? "lds-ring absolute visible left-auto right-auto" 
                : "lds-ring absolute invisible left-auto right-auto" }>
            <div></div><div></div><div></div><div></div>
          </div>
      </button>
    </div>
  )
}

interface Props {
  onClick: (value: string) => void
  placeholder: string
  buttonLabel: string
  isLoading: boolean
}
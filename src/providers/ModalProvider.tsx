import React from "react"
import { useTranslation } from "react-i18next"
import eventBus from "../services/event-bus/event-bus"

const ModalContext = React.createContext<ModalContextType>(null!)

export function ModalProvider({children}: {children: React.ReactNode}) {
  const [type, setType] = React.useState<ModalType>('none')
  const { t } = useTranslation()

  function confirmListCancelling() {
    eventBus.dispatch('cancelListConfirmation', {})
    setType('none')
  }

  function confirmListCompleting() {
    eventBus.dispatch('completeListConfirmation', {})
    setType('none')
  }

  function confirmLogout() {
    console.log('LOGGING OUT')
    eventBus.dispatch('confirmLogout', {})
    setType('none')
  }

  function getModalContent() {
    switch(type) {
      case 'CancelList':
        return (
          <div className="relative flex flex-col">
            <span 
              className="absolute top-0 right-0 material-icons text-disabled text-2xl cursor-pointer"
              onClick={() => setType('none')}
              >close</span>
            <span className="text-2xl text-labels block w-4/5 mb-8">{t("cancelListWarning")}</span>
            <div className="flex justify-end">
              <button 
                className="mx-1 py-5 px-8 text-base rounded-xl"
                onClick={() => setType('none')}
                >{t("cancel")}
              </button>
              <button 
                className="mx-1 py-5 px-8 text-white bg-warning text-base rounded-xl"
                onClick={confirmListCancelling}
                >{t("yes")}
              </button>
            </div>  
          </div>
        )
      case 'CompleteList':
        return (
          <div className="relative flex flex-col">
            <span 
              className="absolute top-0 right-0 material-icons text-disabled text-2xl cursor-pointer"
              onClick={() => setType('none')}
              >close</span>
            <span className="text-2xl text-labels block w-4/5 mb-8">{t("completeListWarning")}</span>
            <div className="flex justify-end">
              <button 
                className="mx-1 py-5 px-8 text-base rounded-xl"
                onClick={() => setType('none')}
                >{t("cancel")}</button>
              <button 
                className="mx-1 py-5 px-8 text-white bg-accent-3 text-base rounded-xl"
                onClick={confirmListCompleting}
                >{t("yes")}</button>
            </div>  
          </div>
        )
      case 'Logout':
        return (
          <div className="relative flex flex-col">
            <span 
              className="absolute top-0 right-0 material-icons text-disabled text-2xl cursor-pointer"
              onClick={() => setType('none')}
              >close</span>
            <span className="text-2xl text-labels block w-4/5 mb-8">{t("confirmLogout")}</span>
            <div className="flex justify-end">
              <button 
                className="mx-1 py-5 px-8 text-base rounded-xl"
                onClick={() => setType('none')}
                >{t("cancel")}</button>
              <button 
                className="mx-1 py-5 px-8 text-white bg-warning text-base rounded-xl"
                onClick={confirmLogout}
                >{t("yes")}</button>
            </div>  
          </div>
        )
      default:
        return null
    }
  }

  const contextValue = React.useMemo<ModalContextType>(() => {
    return {
      displayingType: type,
      setDisplayType: setType,
      getModalContent
    }
  }, [type])

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = React.useContext(ModalContext)
  if (!context) {
    throw Error('modal context needs to be initialized before using it')
  }
  return context
}

interface ModalContextType {
  displayingType: ModalType
  setDisplayType: React.Dispatch<React.SetStateAction<ModalType>>
  getModalContent: () => JSX.Element | null
}

type ModalType = 'CancelList' | 'CompleteList' | 'Logout' | 'none'
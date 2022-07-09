import { useTranslation } from "react-i18next"

export default function ModalLayout({cancel, confirm, buttonBgColor}: Props) {
  const { t } = useTranslation()

  return (
    <div className="relative flex flex-col">
      <span 
        className="absolute top-0 right-0 material-icons text-disabled text-2xl cursor-pointer"
        onClick={cancel}
        >close</span>
      <span className="text-2xl text-labels block w-4/5 mb-8">{t("cancelListWarning")}</span>
      <div className="flex justify-end">
        <button 
          className="mx-1 py-5 px-8 text-base rounded-xl"
          onClick={cancel}
          >{t("cancel")}
        </button>
        <button 
          className={`mx-1 py-5 px-8 text-white ${buttonBgColor} text-base rounded-xl`}
          onClick={confirm}
          >{t("yes")}
        </button>
      </div>  
    </div>
  )
}

interface Props {
  cancel: React.SetStateAction<any>
  confirm: () => void
  buttonBgColor: string
}

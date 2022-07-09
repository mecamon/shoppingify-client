import React from "react"
import { useTranslation } from "react-i18next"
import { OldList } from "../../../models/models"
import { useHistory } from "../../../providers/HistoryProvider"
import ListsEndpoints from "../../../services/rest-api/lists"
import { useErrorHandler } from "../../../hooks/useErrorHandler"


export default function OldListCard({oldList}: Props) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const { t } = useTranslation()
  const { setSelectedList } = useHistory()
  const { httpError } = useErrorHandler()

  async function getListInfo() {
    try{
      setIsLoading(true)
      const res = await ListsEndpoints.getListById(oldList.id)
      setSelectedList(res.data)     
    } catch(e: any) {
      httpError(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center mb-7">
      <button 
        className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between hover:scale-101 p-5 bg-white rounded-xl shadow-card transition-all duration-200 ease-in"
        onClick={async() => getListInfo()}
        disabled={isLoading}
        >
        <span data-testid="name">{oldList.name}</span>
        <div className="flex items-center">
          <span className="material-icons text-disabled text-2xl ">event_note</span>
          <span className="text-disabled text-xs mx-2">{oldList.date.split('T')[0]}</span>
          { oldList.is_completed &&
            <span 
              className="block border border-accent-3 text-accent-3 text-xs mx-5 p-1 rounded-lg"
              data-testid="status-completed">{ t("completed") }</span>
          }
          { oldList.is_cancelled &&
            <span data-testid="status-cancelled">{ t("cancelled") }</span>
          }
          <span className="material-icons text-accent-2 text-4xl">chevron_right</span>
        </div>
      </button>
      { isLoading &&
        <div className="lds-ring lds-accent-ring"><div></div><div></div><div></div><div></div></div>
      }
    </div>
  )
}

interface Props {
  oldList: OldList
}
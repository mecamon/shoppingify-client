import React from "react"
import { useTranslation } from "react-i18next"
import ListsEndpoints from "../../services/rest-api/lists"
import { toast } from "react-toastify"
import ErrorManager from "../shared/ErrorManager/ErrorManager"
import { HMainContent } from "./HMainContent/HMainContent"
import { createGroupByMonth } from "../../helpers/group-by-month"
import { useHistory } from "../../providers/HistoryProvider"
import HCardsSkeletonLoader from "../shared/HCardsSkeletonLoader/HCardsSkeletonLoader"
import { SeletedList } from "./SelectedList/SelectedList"

export function PageHistory() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const { oldLists, setOldLists, selectedList } = useHistory()

  React.useEffect(() => {
    ;(async () => {
      await getOldLists()
    })()
  }, [])

  async function getOldLists() {
    try {
      setIsLoading(true)
      const res = await ListsEndpoints.getOldLists()
      setOldLists(res.data)
    } catch(e: any) {
      toast.error(<ErrorManager error={e} />,
        {position: toast.POSITION.BOTTOM_LEFT}
      )
    } finally {
      setIsLoading(false)
    }
  }

  const { t } = useTranslation()
  return ( 
    <>
      <div id="main-content-container" className="mx-3 lg:mx-8 xl:mx-12 2xl:mx-24 mt-8">
        {
          oldLists === null &&
          <div className="mt-9">
            <h3 className=" text-xl text-light-text">{t("noListInHistory")}</h3>
          </div>  
        }
        {
          selectedList && oldLists
            ? <SeletedList selectedList={selectedList}/>
            : !isLoading 
            ? <HMainContent listGroupByMonth={createGroupByMonth(oldLists)} />
            : <div className="">
                <HCardsSkeletonLoader />
              </div>
        }
      </div>
    </>
  )
}
import React from "react"
import { useTranslation } from "react-i18next"
import ListsEndpoints from "../../services/rest-api/lists"
import { HMainContent } from "./HMainContent/HMainContent"
import { createGroupByMonth } from "../../helpers/group-by-month"
import { useHistory } from "../../providers/HistoryProvider"
import HCardsSkeletonLoader from "../shared/HCardsSkeletonLoader/HCardsSkeletonLoader"
import { SeletedList } from "./SelectedList/SelectedList"
import { useErrorHandler } from "../../hooks/useErrorHandler"

export function PageHistory() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const { oldLists, setOldLists, selectedList } = useHistory()
  const { httpError } = useErrorHandler()

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
      httpError(e)
    } finally {
      setIsLoading(false)
    }
  }

  const { t } = useTranslation()
  return ( 
    <>
      <div id="main-content-container" className="mx-3 lg:mx-8 xl:mx-12 2xl:mx-24 mt-8">
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
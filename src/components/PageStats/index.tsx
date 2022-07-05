import React from "react"
import { TopCategory, TopItem } from "../../models/models"
import TopCategoriesEndpoints from "../../services/rest-api/top-categories"
import ErrorManager from "../shared/ErrorManager/ErrorManager"
import { toast } from 'react-toastify'
import TopItemsEndpoints from "../../services/rest-api/top-items"
import ItemPercentage from "./ItemPercentage/ItemPercentage"
import { t } from "i18next"
import { useTranslation } from "react-i18next"

export default function PageStats() {
  const [topCategories, setTopCategories] = React.useState<TopCategory[]>(null!)
  const [isLoadingTopCat, setIsLoadingTopCat] = React.useState<boolean>(false)
  const [topItems, setTopItems] = React.useState<TopItem[]>(null!)
  const [isLoadingTopItems, setIsLoadingTopItems] = React.useState<boolean>(false)

  const { t } = useTranslation()

  React.useEffect(() => {
    ;(async() => {
      await getTopCategories()
      await getTopItems()
    })()
  }, [])

  async function getTopCategories() {
    try {
      setIsLoadingTopCat(true)
      const res = await TopCategoriesEndpoints.top()
      setTopCategories(res.data)
    }catch(e: any) {
      toast.error(<ErrorManager error={e}/>, {
        position: toast.POSITION.BOTTOM_LEFT,
      })
    } finally {
      setIsLoadingTopCat(false)
    }
  }

  async function getTopItems() {
    try {
      setIsLoadingTopItems(true)
      const res = await TopItemsEndpoints.top()
      setTopItems(res.data)
    }catch(e: any) {
      toast.error(<ErrorManager error={e}/>, {
        position: toast.POSITION.BOTTOM_LEFT,
      })
    } finally {
      setIsLoadingTopItems(false)
    }
  }

  return (
    <>
      <div id="main-content-container" className="mx-3 lg:mx-8 xl:mx-12 2xl:mx-24 mt-8">
        <div className="w-full flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 px-4 lg:px-8">
            <h2 className="text-2xl">{t("topItems")}</h2>
            <div className="mt-8">
              { topItems?.map(i => <ItemPercentage key={i.id} topItem={i} /> ) }  
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-4 lg:px-8 mt-10 lg:mt-0">
            <h2 className="text-2xl">{t("topCategories")}</h2>
            <div className="mt-8">
              { topCategories?.map(c => <ItemPercentage key={c.id} topItem={c} /> ) }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
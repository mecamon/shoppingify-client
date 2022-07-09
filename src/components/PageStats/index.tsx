import React from "react"
import { ItemsSummaryByMonth, ItemSummaryByYear, TopCategory, TopItem } from "../../models/models"
import TopCategoriesEndpoints from "../../services/rest-api/top-categories"
import TopItemsEndpoints from "../../services/rest-api/top-items"
import ItemPercentage from "./ItemPercentage/ItemPercentage"
import { useTranslation } from "react-i18next"
import ItemsSummaryEndpoints from "../../services/rest-api/items-summary"
import CustomLineGraph from "./CustomLineGraph/CustomLineGraph"
import { useErrorHandler } from "../../hooks/useErrorHandler"

export default function PageStats() {
  const [topCategories, setTopCategories] = React.useState<TopCategory[]>(null!)
  const [isLoadingTopCat, setIsLoadingTopCat] = React.useState<boolean>(false)
  const [topItems, setTopItems] = React.useState<TopItem[]>(null!)
  const [isLoadingTopItems, setIsLoadingTopItems] = React.useState<boolean>(false)
  const [summaryByMonth, setSummaryByMonth] = React.useState<ItemsSummaryByMonth>(null!)
  const [isLoadingSumByMonth, setIsLoadingSumBymonth] = React.useState<boolean>(false)
  const [summaryByYear, setSummaryByYear] = React.useState<ItemSummaryByYear[]>(null!)
  const [isLoadingSumByYear, setIsloadingSumByYear] = React.useState<boolean>(false)

  const { t } = useTranslation()
  const { httpError } = useErrorHandler()

  React.useEffect(() => {
    ;(async() => {
      await Promise.all([
        getTopCategories(),
        getTopItems(),
        getSummaryByMonth(),
        getSummaryByYear()
      ])
    })()
  }, [])

  async function getTopCategories() {
    try {
      setIsLoadingTopCat(true)
      const res = await TopCategoriesEndpoints.top()
      setTopCategories(res.data)
    }catch(e: any) {
      httpError(e)
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
      httpError(e)
    } finally {
      setIsLoadingTopItems(false)
    }
  }

  async function getSummaryByMonth() {
    try {
      setIsLoadingSumBymonth(true)
      const currentDate = new Date()
      const year = currentDate.getFullYear()
      const res = await ItemsSummaryEndpoints.getByMonth(year)
      setSummaryByMonth(res.data)
    } catch(e: any) {
      httpError(e)
    } finally {
      setIsLoadingSumBymonth(false)
    }
  }

  async function getSummaryByYear() {
    try {
      setIsloadingSumByYear(true)
      const res = await ItemsSummaryEndpoints.getByYear()
      setSummaryByYear(res.data)
    } catch(e: any) {
      httpError(e)
    } finally {
      setIsloadingSumByYear(false)
    }
  }

  return (
    <>
      <div id="main-content-container" className="mx-3 lg:mx-8 xl:mx-12 2xl:mx-24 mt-8">
        <div className="w-full flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 px-4 lg:px-8">
            <h2 className="text-2xl">{t("topItems")}</h2>
            { isLoadingTopItems 
              ? <div className="w-full h-60 my-3 rounded-xl card-skeleton"></div>
              : <div className="mt-8">
                  { topItems?.map(i => <ItemPercentage key={i.id} topItem={i} barColor="#F9A109" /> ) }  
                </div>
            }
          </div>
          <div className="w-full lg:w-1/2 px-4 lg:px-8 mt-10 lg:mt-0">
            <h2 className="text-2xl">{t("topCategories")}</h2>
            { isLoadingTopCat
              ? <div className="w-full h-60 my-3 rounded-xl card-skeleton"></div>
              : <div className="mt-8">
                  { topCategories?.map(c => <ItemPercentage key={c.id} topItem={c} barColor="#56CCF2" /> ) }
                </div>
            }
          </div>
        </div>
        <div>
          {/* BY MONTH */}
          { isLoadingSumByMonth 
            ? <div className="mt-14">
                <div className="w-full h-60 my-3 rounded-xl card-skeleton"></div>
              </div>
            : summaryByMonth !== null &&
              <div className="mt-14">
                <h2 className="text-2xl mx-10 mb-5">{t("monthlySum")}</h2>
                <CustomLineGraph 
                dataForGraps={ summaryByMonth.months.map(m => ({x: m.month, y: m.quantity}))} 
                xDataKey={t("months")} 
                lineDataKey={t("items")} />
              </div>
          }
          {/* BY YEAR */}
          { isLoadingSumByYear 
            ? <div className="mt-14">
                <div className="w-full h-60 my-3 rounded-xl card-skeleton"></div>
              </div>
            : summaryByYear !== null &&
              <div className="mt-14">
                <h2 className="text-2xl mx-10 mb-5">{t("yearlySum")}</h2>
                <CustomLineGraph 
                dataForGraps={ summaryByYear.map(m => ({x: m.year, y: m.quantity}))} 
                xDataKey={t("years")} 
                lineDataKey={t("items")} />
              </div>
          }
        </div>
      </div>
    </>
  )
}
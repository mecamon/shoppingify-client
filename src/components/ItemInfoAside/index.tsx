import React from "react"
import { useTranslation } from "react-i18next"
import { useItems } from "../../providers/ItemsProvider"
import { useList } from "../../providers/ListProvider"
import ListsEndpoints from "../../services/rest-api/lists"
import ItemInfoMainContent from "./ItemInfoMainContent/ItemInfoMainContent"
import { toast } from 'react-toastify'
import ItemsEndpoints from "../../services/rest-api/items"
import DisplayErrors from "../shared/DisplayErrors/DisplayErrors"
import { useErrorHandler } from "../../hooks/useErrorHandler"

export default function ItemInfoAside() {
  const [isLoadingAddToList, setIsLoadingAddToList] = React.useState<boolean>(false)
  const [isLoadingDelete, setIsLoadingDelete] = React.useState<boolean>(false)

  const { t } = useTranslation()
  const { itemDetails, getItems } = useItems()
  const { active, setAsideMode } = useList()
  const { httpError } = useErrorHandler()

  async function addToList() {
    if (active === null) {
      toast.error(<DisplayErrors errs={t("noActiveList")} />, 
        {position: toast.POSITION.BOTTOM_LEFT}
      )
      return
    }
    setIsLoadingAddToList(true)
    try {
      await ListsEndpoints.addItemToActive({
        item_id: itemDetails.id,
        list_id: active.id,
        quantity: 1,
      })
    } catch(e: any) { 
      httpError(e)
    } finally {
      setIsLoadingAddToList(false)
    }
  }

  async function deleteSelected() {
    setIsLoadingDelete(true)
    try {
      await ItemsEndpoints.deleteById(itemDetails.id)
      await getItems('')
      toast.success(t("itemDeletedMessage"), {
        position: toast.POSITION.BOTTOM_LEFT,
    })
    setAsideMode('List')
    } catch(e: any) {
      httpError(e)
    } finally {
      setIsLoadingDelete(false)
    }
  }

  function backToList() {
    setAsideMode('List')
  }

  return (
    <>
      <ItemInfoMainContent itemDetails={itemDetails} backToList={backToList} />
      <div className="absolute flex justify-center items-center z-10 bottom-0 w-full p-11 bg-white">
        <div className="mx-2">
          <button className="flex justify-center min-w-details-sb-button items-center bg-white text-base rounded-xl py-5 transition-colors duration-500 ease-in"
            data-testid="action-button" 
            disabled={isLoadingDelete || isLoadingAddToList}
            onClick={async() => deleteSelected()}>
              { !isLoadingDelete 
                  ? <span data-testid="button-label" >{ t("delete") }</span>
                  : <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
              }
          </button>
        </div>
        <div className="mx-2">
          <button 
            className="flex justify-center min-w-details-sb-button items-center bg-accent-2 text-base text-white rounded-xl py-5 transition-colors duration-500 ease-in"
            data-testid="action-button" 
            disabled={isLoadingAddToList || isLoadingAddToList}
            onClick={async() => addToList()}>
              { !isLoadingAddToList 
                  ? <span data-testid="button-label" >{ t("addToList") }</span>
                  : <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
              }
          </button>
        </div>
      </div>
    </>
  )
}
import React from "react"
import { useList } from "../../providers/ListProvider"
import ListsEndpoints from "../../services/rest-api/lists"
import ListAsideMainContent from "./ListAsideMainContent/ListAsideMainContent"
import BottomBarContent from "./BottomBarContent/BottomBarContent"
import { toast } from 'react-toastify'
import DisplayErrors from "../shared/DisplayErrors/DisplayErrors"
import { ItemToUpdateInList, ListItem, ListToCreateOrUpdate } from "../../models/models"
import { useTranslation } from "react-i18next"
import { AxiosResponse } from "axios"
import BottomBarActListContent from "./BottomBarActListContent/BottomBarActListContent"
import BottomBarCompleting from "./BottomBarCompleting/BottomBarCompleting"
import eventBus from "../../services/event-bus/event-bus"

export default function ListAside() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isLoadingCompleting, setIsLoadingCompleting] = React.useState<boolean>(false)
  const [itemsToUpdate, setItemsToUpdate] = React.useState<ItemToUpdateInList[]>([])
  const [itemsToDelete, setItemsToDelete] = React.useState<number[]>([])

  const { active, setActive, isCompleting, setIsCompleting, setAsideMode } = useList()
  const { t } = useTranslation()

  React.useEffect(() => {
    async function getActiveList() {
      if (!isLoading) {
        await loadActiveList()
      }
    }
    getActiveList()
    eventBus.on('cancelListConfirmation', (data) => {
      confirmCancelList()
    })
    eventBus.on('completeListConfirmation', (data) => {
      confirmCompleteList()
    })
    return () => {
      eventBus.remove('cancelListConfirmation', confirmCancelList)
      eventBus.remove('completeListConfirmation', confirmCompleteList)
    } 
  }, [])

  async function loadActiveList() {
    setIsLoading(true)
    try {
      const res = await ListsEndpoints.getActive()
      setActive(res.data)
    } catch(e: any) {
      if (e?.response.status !== 404) {
        toast.error(<DisplayErrors errs={e?.response.data}/>, {
          position: toast.POSITION.BOTTOM_RIGHT,
        })  
      } else {
        setActive(null!)
      }
    } finally {
      setIsLoading(false)
    }
  }

  async function createList(name: string) {
    setIsLoading(true)
    try {
      const listToCreate: ListToCreateOrUpdate = {name}
      await ListsEndpoints.create(listToCreate)
      await loadActiveList()
    } catch(e: any) {
      toast.error(<DisplayErrors errs={e?.response.data}/>, {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    } finally {
      setIsLoading(false)
    }
  }

  function updateItems(lists: ListItem) {
    const item: ItemToUpdateInList = {item_id: lists.id, quantity: lists.quantity} 
    setItemsToUpdate((prev) => [...prev, item])
  }

  function setItemsToDeleteOnClient(id: number) {
    setItemsToDelete(prev => [...prev, id])
  }

  async function saveChangesOnList(renameList: string) {
    setIsLoading(true)
    try {
      //Order matters. Update first, delete after, then rename
      await ListsEndpoints.updateItemInActiveList(itemsToUpdate)
      const requests = createDeleteArray()
      await Promise.all(requests)
      if (renameList !== '') {
        await ListsEndpoints.updateActiveName({name: renameList})
      }
      await loadActiveList()
    } catch (e: any) {
      toast.error(<DisplayErrors errs={e?.response.data}/>, {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    } finally {
      setIsLoading(false)
    }
  }

  function createDeleteArray(): Promise<AxiosResponse>[] {
    return itemsToDelete.map(i => ListsEndpoints.deleteSelectedItem(i))
  }

  async function confirmCancelList() {
    setIsLoadingCompleting(true)
    try {
      await ListsEndpoints.cancelActive()
      toast.success(t("listCancelledMessage"), {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
      resetBottomBars()
      await loadActiveList()
    } catch(e: any) {
      if (e?.response.status !== 404) {
        toast.error(<DisplayErrors errs={e?.response.data}/>, {
          position: toast.POSITION.BOTTOM_RIGHT,
        })  
      }
    } finally {
      setIsLoadingCompleting(false)
    }
  }

  async function confirmCompleteList() {
    setIsLoadingCompleting(true)
    try {
      await ListsEndpoints.completeActive()
      toast.success(t("listCompletedMessage"), {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
      resetBottomBars()
      await loadActiveList()
    } catch(e: any) {
      if (e?.response.status !== 404) {
        toast.error(<DisplayErrors errs={e?.response.data}/>, {
          position: toast.POSITION.BOTTOM_RIGHT,
        })  
      }
    } finally {
      setIsLoadingCompleting(false)
    }
  }

  function resetBottomBars() {
    setAsideMode('List')
    setIsCompleting(false)
  }

  return (
    <> 
      <ListAsideMainContent 
        list={active} 
        updateItems={updateItems} 
        setItemsToDeleteOnClient={setItemsToDeleteOnClient}
      />
      <div className="absolute z-10 bottom-0 w-full p-11 bg-white">
        { isCompleting
          ? <BottomBarCompleting isLoading={isLoadingCompleting}/>
          : active !== null 
          ? <BottomBarActListContent 
              onClick={saveChangesOnList} 
              isLoading={isLoading} 
              placeholder={t("changeListNamePlaceholder")} 
              buttonLabel={t("saveButtonLabel")}
              />
          : <BottomBarContent 
              onClick={createList} 
              isLoading={isLoading} 
              placeholder={t("enterName")} buttonLabel={t("createList")}
              />
        }
      </div>
    </>
  )
}


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
import { useModal } from "../../providers/ModalProvider"

export default function ListAside() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isLoadingCompleting, setIsLoadingCompleting] = React.useState<boolean>(false)
  const [itemsToUpdate, setItemsToUpdate] = React.useState<ItemToUpdateInList[]>([])
  const [itemsToDelete, setItemsToDelete] = React.useState<number[]>([])

  const { active, setActive, isCompleting } = useList()
  const { setDisplayType } = useModal()
  const { t } = useTranslation()

  React.useEffect(() => {
    async function getActiveList() {
      if (!isLoading) {
        await loadActiveList()
      }
    }
    getActiveList()
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
      await ListsEndpoints.updateActiveName({name: renameList})
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

  function cancelList() {
    console.log('CANCELING LIST....')
    setDisplayType('CancelList')
  }

  function completeList() {
    console.log('COMPLETING LIST....')
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
          ? <BottomBarCompleting 
              cancel={cancelList} 
              complete={completeList} 
              isLoading={isLoadingCompleting}/>
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


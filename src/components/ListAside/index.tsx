import React from "react"
import { useList } from "../../providers/ListProvider"
import ListsEndpoints from "../../services/rest-api/lists"
import ListAsideMainContent from "./ListAsideMainContent/ListAsideMainContent"
import SBBottomBarContent from "./SBBottomBarContent/SBBottomBarContent"
import { toast } from 'react-toastify'
import DisplayErrors from "../shared/DisplayErrors/DisplayErrors"
import { ListToCreateOrUpdate } from "../../models/models"
import { useTranslation } from "react-i18next"

export default function ListAside() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const { active, setActive, setAsideMode } = useList()
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

  function addItem() {
    setAsideMode('CreatingItem')
  }

  async function save() {

  }

  return (
    <>
      <ListAsideMainContent list={active} addItem={addItem} />
      <div className="absolute z-10 bottom-0 w-full p-11 bg-white">
        {
          active !== null 
          ? <SBBottomBarContent onClick={save} isLoading={isLoading} placeholder={t("enterName")} buttonLabel={t("saveButtonLabel")}/>
          : <SBBottomBarContent onClick={createList} isLoading={isLoading} placeholder={t("enterName")} buttonLabel={t("createList")}/>
        }
      </div>
    </>
  )
}
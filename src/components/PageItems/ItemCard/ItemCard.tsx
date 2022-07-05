import React from "react"
import {Item} from "../../../models/models"
import { useList } from "../../../providers/ListProvider"
import ListsEndpoints from "../../../services/rest-api/lists"
import { toast } from "react-toastify"
import ErrorManager from "../../shared/ErrorManager/ErrorManager"
import { useTranslation } from "react-i18next"
import DisplayErrors from "../../shared/DisplayErrors/DisplayErrors"

export default function ItemCard({item, selectItem}: Props) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const { active, setActive } = useList()
  const { t } = useTranslation()

  async function addItemToList(e: React.MouseEvent) {
    e.stopPropagation()
    if (active === null) {
      toast.error(<DisplayErrors errs={t("noActiveList")} />, 
        {position: toast.POSITION.BOTTOM_LEFT}
      )
      return
    }
    try {
      setIsLoading(true)
      await ListsEndpoints.addItemToActive({
        item_id: item.id, 
        list_id: active.id, 
        quantity: 1})
      await reloadList()
      toast.success(t("itemAddedMessage"),
        {position: toast.POSITION.BOTTOM_LEFT}
      )
    }catch(e: any) {
      toast.error(<ErrorManager error={e} />, 
        {position: toast.POSITION.BOTTOM_LEFT}
      )
    } finally {
      setIsLoading(false)
    }
  }
  
  async function reloadList() {
    try {
      setIsLoading(true)
      const res = await ListsEndpoints.getActive()
      setActive(res.data)
    } catch(e: any) {
      toast.error(<ErrorManager error={e} />, 
        {position: toast.POSITION.BOTTOM_LEFT}
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      data-testid="card-body"
      className="item-card hover:bg-gray-100 cursor-pointer"
      onClick={async() => selectItem(item.id)}
      >
      <span data-testid="name" className="block text-base text-bubble-label">{item.name}</span>
      { !isLoading &&
        <button 
          className=" hover:bg-accent-2 text-disabled hover:text-white rounded-full p-1"
          disabled={isLoading}
          onClick={async(e) => addItemToList(e)}
          >
            <span className="block material-icons hover:text-white">add</span>
        </button>
      }
    </div>
  )
}

interface Props {
  item: Item
  selectItem: (id: number) => Promise<void>
}

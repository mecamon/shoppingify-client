import React from "react"
import { ListItem } from "../../../models/models"
import ListsEndpoints from "../../../services/rest-api/lists"
import DisplayErrors from "../../shared/DisplayErrors/DisplayErrors"
import { ListSelEditController } from "../ListSelEditController/ListSelEditController"
import { toast } from 'react-toastify'
import { useList } from "../../../providers/ListProvider"

export function ListSelectedItemLine({listItem}: Props) {
  const [isShowingEdit, setIsShowingEdit] = React.useState<boolean>(false)
  const { setActive } = useList()

  function updateQuantity(operation: AritmeticOps) {

  }

  async function deleteItem(id: number) {
    try {
      await ListsEndpoints.deleteSelectedItem(id) 
      await reloadList()
    } catch (e: any) {
      toast.error(<DisplayErrors errs={e?.response.data}/>, {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    }
  }

  async function reloadList() {
    try {
      const res = await ListsEndpoints.getActive() 
      setActive(res.data)
    } catch (e: any) {
      toast.error(<DisplayErrors errs={e?.response.data}/>, {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    }
  }

  return(
    <div className="w-full flex my-2">
      <div className="w-1/2 flex items-center">
        <span className="text-lg block" data-testid="item-name">{listItem?.name}</span>
      </div>
      { isShowingEdit 
          ? <ListSelEditController 
              updateQuantity={updateQuantity}
              deleteItem={deleteItem} 
              listItem={listItem} />
          : <div className="w-1/2 flex justify-end items-center">
              <div>
                <button 
                  className="flex items-center py-2 text-xs border-2 hover:bg-accent-2 border-accent-2 
                  text-accent-2 hover:text-white rounded-full px-4"
                  data-testid="item-quantity"
                  onClick={() => setIsShowingEdit(true)}
                  >
                  {listItem.quantity + 'pcs'}
                </button>
              </div>
            </div>
      }
    </div> 
  )
}

interface Props {
  listItem: ListItem
}

export type AritmeticOps = 'addition' | 'substraction'
import React from "react"
import { ListItem } from "../../../models/models"
import { useList } from "../../../providers/ListProvider"
import { ListSelEditController } from "../ListSelEditController/ListSelEditController"


export function ListSelectedItemLine({listItem, updateClientData, deleteClientData}: Props) {
  const [isShowingEdit, setIsShowingEdit] = React.useState<boolean>(false)
  const { active } = useList()

  React.useEffect(() => {
    setIsShowingEdit(false)
  }, [active])

  function updateQuantity(category_id: number, itemSelId: number, operation: AritmeticOps) {
    updateClientData(category_id, itemSelId, operation)
  }

  function deleteItem(category_id: number, itemSelId: number,) {
    deleteClientData(category_id, itemSelId)
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
  updateClientData: (category_id: number, itemSelId: number, operation: AritmeticOps) => void
  deleteClientData: (category_id: number, itemSelId: number) => void
}

export type AritmeticOps = 'addition' | 'substraction'
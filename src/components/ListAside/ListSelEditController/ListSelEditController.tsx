import React from "react"
import { ListItem } from "../../../models/models"
import { AritmeticOps } from "../ListSelectedItemLine/ListSelectedItemLine"

export function ListSelEditController({listItem, updateQuantity, deleteItem}: Props) {
  return (
    <div className="w-1/2 flex justify-end">
      <div className=" bg-main-bg flex justify-between h-11 rounded-xl">
        <button 
          className="bg-accent-2 text-white rounded-xl px-2 hover:opacity-80 flex items-center"
          data-testid="delete-item-button"
          onClick={async() => deleteItem(listItem?.id)}
          >
          <span className="material-icons text-white">delete</span>
        </button>
        <div className="flex items-center">
          <button 
            className="mx-2 flex items-center p-1 rounded-full hover:bg-grey-traslucid"
            data-testid="update-minus-quantity-button"
            onClick={() => updateQuantity('addition')}
            >
            <span className="material-icons text-accent-2">remove</span>
          </button>
          <div 
            className="flex py-2 items-center text-xs border-2 border-accent-2 
            text-accent-2 rounded-full px-4"
            data-testid="item-quantity"
            >
            {listItem?.quantity + 'pcs'}
          </div>
          <button 
            className="mx-2 flex items-center p-1 rounded-full hover:bg-grey-traslucid"
            data-testid="update-plus-quantity-button"
            onClick={() => updateQuantity('substraction')}
            >
            <span className="material-icons text-accent-2">add</span>
          </button>
        </div>
      </div>
    </div>
  )
}

interface Props {
  listItem: ListItem
  updateQuantity: (operation: AritmeticOps) => void
  deleteItem: (id: number) => Promise<void>
}
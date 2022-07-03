import React from "react"
import { ListItem } from "../../../models/models"

export default function ListSelectedItemLineComplete({listItem, complete}: Props) {
  const checkbox = React.useRef<HTMLInputElement>(null!)
  function onChange() {
    return
  }

  return(
    <div className="w-full flex my-2">
      <div className="w-1/2 flex items-center justify-start">
        <input 
          ref={checkbox}
          hidden
          className="mr-2"
          type="checkbox" 
          checked={listItem.is_completed} 
          onChange={onChange}
          name="completed" 
          id="completed" />
        <span 
          className="absolute z-40 cursor-pointer text-3xl material-icons text-accent-2"
          data-testid="change-status"
          onClick={async() => complete(listItem.id)}
          >check_box_outline_blank</span> 
        { listItem.is_completed &&
          <span data-testid="checked" className="absolute material-icons text-3xl text-accent-2">done</span>
        }
        <span 
          className={listItem.is_completed ? "text-lg block ml-9 line-through" : "text-lg block ml-9"} 
          data-testid="item-name">{listItem?.name}
        </span>
      </div>
      <div className="w-1/2 flex justify-end items-center">
        <div>
          <span 
            className="flex items-center py-2 text-xs border-2  border-accent-2 
            text-accent-2 rounded-full px-4"
            data-testid="item-quantity"
            >
            {listItem.quantity + 'pcs'}
          </span>
        </div>
      </div>
    </div> 
  )
}

interface Props {
  listItem: ListItem
  complete: (itemSelId: number) => Promise<void>
}
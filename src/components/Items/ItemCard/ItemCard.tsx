import React from "react"
import {Item} from "../../../models/models"

export default function ItemCard({item, selectItem}: Props) {
  return (
    <div
      data-testid="card-body"
      className="bg-white hover:bg-gray-100 cursor-pointer flex justify-between p-4 rounded-xl shadow-card"
      onClick={async() => selectItem(item.id)}
      >
      <span data-testid="name" className="block text-base text-bubble-label">{item.name}</span>
      <span className="block material-icons text-disabled">add</span>
    </div>
  )
}

interface Props {
  item: Item
  selectItem: (id: number) => Promise<void>
}

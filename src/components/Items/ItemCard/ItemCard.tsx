import {Item} from "../../../models/models"
import React from "react";

export default function ItemCard({item, selectItem}: Props) {
  return (
      <div
          data-testid="card-body"
          className="bg-white hover:bg-gray-100 cursor-pointer flex justify-between p-4 rounded-xl shadow-card"
          onClick={() => selectItem()}
          >
        <span data-testid="name" className="block text-base text-bubble-label">{item.name}</span>
        <span className="block material-icons text-disabled">add</span>
      </div>
  )
}

interface Props {
  item: Item
  selectItem: Function
}

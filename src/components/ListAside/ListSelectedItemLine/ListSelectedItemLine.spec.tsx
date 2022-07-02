import { render } from "@testing-library/react"
import React from "react"
import { ListItem } from "../../../models/models"
import ListProvider from "../../../providers/ListProvider"
import { ListSelectedItemLine } from "./ListSelectedItemLine"

describe('ListSelectedItemLine', () => {
  const listItem: ListItem = {
    id: 1,
    item_id: 1,
    name: 'Apple',
    quantity: 3,
    category_id: 3,
    category_name: 'Fruits',
    is_completed: false,
  }
  it('find the name of the item and the quantity passed by the prop in the dom', () => {
    const { getByTestId } = render(
      <ListProvider>
        <ListSelectedItemLine listItem={listItem} />
      </ListProvider>)
    const itemName = getByTestId('item-name')
    const itemQuantity = getByTestId('item-quantity')

    expect(itemName.textContent).toContain(listItem.name)
    expect(itemQuantity.textContent).toEqual(`${listItem.quantity}pcs`)
  })
})
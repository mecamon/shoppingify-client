import React from "react"
import { fireEvent, render } from "@testing-library/react"
import { ListItem } from "../../../models/models"
import { ListSelEditController } from "./ListSelEditController"

describe('ListSelEditController', () => {
  const listItem: ListItem = {
    id: 1,
    item_id: 1,
    name: 'Apple',
    quantity: 3,
    category_id: 3,
    category_name: 'Fruits',
    is_completed: false,
  }
  let updateQuantity = jest.fn()
  let deleteItem = jest.fn()

  it('finds the quantity passed by the props in the dom', () => {
    const { getByTestId } = render(
    <ListSelEditController 
      listItem={listItem} 
      updateQuantity={updateQuantity}
      deleteItem={deleteItem}
    />)
    const quantity = getByTestId('item-quantity')
    expect(quantity.textContent).toEqual(`${listItem.quantity}pcs`)
  })

  it('triggers the "updateQuantity" and "deleteItem" after clicking the action buttons', () => {
    const { getByTestId } = render(
      <ListSelEditController 
        listItem={listItem} 
        updateQuantity={updateQuantity}
        deleteItem={deleteItem}
      />)
    const updateMinusQuantityBtn = getByTestId('update-minus-quantity-button')
    const updatePlusQuantityBtn = getByTestId('update-plus-quantity-button')
    const deleteItemBtn = getByTestId('delete-item-button')

    fireEvent.click(updateMinusQuantityBtn)
    fireEvent.click(updatePlusQuantityBtn)
    fireEvent.click(deleteItemBtn)

    expect(updateQuantity).toHaveBeenCalledTimes(2)
    expect(deleteItem).toHaveBeenCalledTimes(1)
  })
})
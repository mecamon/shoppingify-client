import { fireEvent, render } from "@testing-library/react"
import React from "react"
import { ListItem } from "../../../models/models"
import ListSelectedItemLineComplete from "./ListSelectedItemLineComplete"

describe('ListSelectedItemLineComplete', () => {
  let listItem: ListItem = {
    id: 2,
    item_id: 2,
    name: "Apple",
    quantity: 6,
    category_id: 0,
    category_name: "Fruits",
    is_completed: true
  }
  let complete = jest.fn()
  it('finds the props in the displayed in the dom', () => {
    const { getByTestId } = render(
      <ListSelectedItemLineComplete 
        listItem={listItem} 
        complete={complete}/>)

    const checkedSpan = getByTestId('checked')
    const itemName = getByTestId('item-name')
    const quantity = getByTestId('item-quantity')

    expect(checkedSpan).toBeInTheDocument()
    expect(itemName.textContent).toEqual(listItem.name)
    expect(quantity.textContent).toEqual(`${listItem.quantity}pcs`)
  })

  it('triggers the "complete" function after click', () => {
    const { getByTestId } = render(
      <ListSelectedItemLineComplete 
        listItem={listItem} 
        complete={complete}/>)

    const changeBox = getByTestId('change-status')
    fireEvent.click(changeBox)

    expect(complete).toHaveBeenCalledTimes(1)
  })
})
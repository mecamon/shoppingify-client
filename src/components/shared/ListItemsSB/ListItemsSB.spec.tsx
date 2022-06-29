import React from "react"
import { fireEvent, render } from "@testing-library/react"
import ListItemsSB from "./ListItemsSB"
import { List } from "../../../models/models"

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str:any) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}))

describe('ListItemsSB', () => {
  let addItem = jest.fn()
  let list: List = {
    name: "List 1",
    date: "06-24-2022",
    id: 123445,
    is_cancelled: false,
    is_completed: false,
    items: []
  } 

  beforeEach(() => {
    addItem.mockClear()
  })

  it('triggers the "addItem" function on click', () => {
    const { getByTestId } = render(<ListItemsSB addItem={addItem} list={null!} />)
    const addItemButton = getByTestId('add-item')
    fireEvent.click(addItemButton)
    expect(addItem).toHaveBeenCalledTimes(1)
  })

  it('shows "No items" message when getting a list with no items', () => {
    const { getByTestId } = render(<ListItemsSB addItem={addItem} list={list} />)
    const noItems = getByTestId('no-items')
    expect(noItems).toBeInTheDocument()
  })
})
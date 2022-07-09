import React from "react"
import { fireEvent, render } from "@testing-library/react"
import ListAsideMainContent from "./ListAsideMainContent"
import { List } from "../../../models/models"
import ListProvider from "../../../providers/ListProvider"
import AuthProvider from "../../../providers/AuthProvider"

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
  let updateItems = jest.fn()
  let setItemsToDeleteOnClient = jest.fn()
  let list: List = {
    name: "List 1",
    date: "06-24-2022",
    id: 123445,
    is_cancelled: false,
    is_completed: false,
    items: []
  } 

  beforeEach(() => {
    updateItems.mockClear()
    setItemsToDeleteOnClient.mockClear()
  })

  it('shows "No items" message when getting a list with no items', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <ListProvider>
          <ListAsideMainContent 
          updateItems={updateItems} 
          setItemsToDeleteOnClient={setItemsToDeleteOnClient}
          list={list} />
        </ListProvider>
      </AuthProvider>
      )
    const noItems = getByTestId('no-items')
    expect(noItems).toBeInTheDocument()
  })

  it('it finds the no active list message when the list value is null', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <ListProvider>
          <ListAsideMainContent 
          updateItems={updateItems} 
          setItemsToDeleteOnClient={setItemsToDeleteOnClient}
          list={null!} 
          />
        </ListProvider>
      </AuthProvider>
      )
    const noActiveListMessage = getByTestId("no-list")
    expect(noActiveListMessage).toBeInTheDocument()
  })
})
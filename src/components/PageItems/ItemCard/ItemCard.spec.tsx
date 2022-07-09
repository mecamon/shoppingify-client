import React from "react"
import { render, fireEvent } from '@testing-library/react'
import ItemCard from "./ItemCard"
import {Item} from "../../../models/models"
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

describe('ItemCard', () => {
  const item: Item = {
    id: 1234,
    name: "Apple",
    category_id: 23,
  }
  let selectItem: jest.Mock
  beforeEach(() => {
    selectItem = jest.fn()
  })

  it('finds the prop name in the card text',  () => {
    const { getByTestId } = render(
      <AuthProvider>
        <ListProvider>
          <ItemCard item={item} selectItem={selectItem} />
        </ListProvider> 
      </AuthProvider>
      )
    const itemName = getByTestId('name')
    expect(itemName.textContent).toBe(item.name)
  })

  it('it triggers the selectItem function on click',  () => {
    const { getByTestId } = render(
    <AuthProvider>
      <ListProvider>
        <ItemCard item={item} selectItem={selectItem} />
      </ListProvider>
    </AuthProvider>  
    
    )
    const cardEl = getByTestId('card-body')
    fireEvent.click(cardEl)
    expect(selectItem).toHaveBeenCalledTimes(1)
  })
})

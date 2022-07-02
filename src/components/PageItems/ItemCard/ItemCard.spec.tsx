import React from "react";
import { render, fireEvent } from '@testing-library/react'
import ItemCard from "./ItemCard";
import {Item} from "../../../models/models";

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
    const { getByTestId } = render(<ItemCard item={item} selectItem={selectItem} />)
    const itemName = getByTestId('name')
    expect(itemName.textContent).toBe(item.name)
  })

  it('it triggers the selectItem function on click',  () => {
    const { getByTestId } = render(<ItemCard item={item} selectItem={selectItem} />)
    const cardEl = getByTestId('card-body')
    fireEvent.click(cardEl)
    expect(selectItem).toHaveBeenCalledTimes(1)
  })
})

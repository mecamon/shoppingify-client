import { render } from "@testing-library/react"
import React from "react"
import { TopCategory, TopItem } from "../../../models/models"
import ItemPercentage from "./ItemPercentage"

describe('ItemPercentage', () => {
  let topItem: TopItem = {
    id: 2,
    item_id: 6,
    name: "Apple",
    percentage: 23,
    sum_quantity: 2
  }
  it('finds the name and the percentage of an item', () => {
    const { getByTestId } = render(<ItemPercentage topItem={topItem} />)
    const name = getByTestId('name')
    const percentage = getByTestId('percentage') as HTMLDivElement

    expect(name.textContent).toEqual(topItem.name)
    expect(percentage.style.width).toEqual(`${topItem.percentage}%`)
  })
})
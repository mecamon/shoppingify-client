import { render, screen } from '@testing-library/react'
import React from 'react'
import CategoryGroup from "./CategoryGroup"
import {GroupOfItemsByCat, Item} from "../../../models/models"
import ItemsEndpoints from '../../../services/rest-api/items'
import ItemsProvider from "../../../providers/ItemsProvider"
jest.mock('../../../services/rest-api/items')

describe('CategoryGroup', () => {
  let group: GroupOfItemsByCat;

  beforeAll(() => {
    const mockItemsEndpoints = ItemsEndpoints as jest.MockedClass<typeof ItemsEndpoints>
    const responseData: Item = {id: 1, name: 'Apple', category_id: 332, image_url: '', note: 'random'}
    mockItemsEndpoints.getById = jest.fn().mockResolvedValue({
      data: responseData,
      status: 200,
      statusText: '',
      headers: {},
      config: {},
    })
  })

  beforeEach(() => {
    group = {
      category_id: 332,
      category_name: 'Fruits',
      items: [
        {id: 1, name: 'Apple', category_id: 332, image_url: '', note: 'random'},
        {id: 2, name: 'Pearl', category_id: 332, image_url: '', note: 'random'},
      ]
    }
  })

  it('matches the category with the one passed by the props',  () => {
    const { getByTestId } = render(
      <ItemsProvider>
        <CategoryGroup group={group} />
      </ItemsProvider>
    )
    const categoryTitle = getByTestId('category')
    expect(categoryTitle).toBeInTheDocument()
    expect(categoryTitle.textContent).toBe(group.category_name)
  });

  it('finds the quantity of items in the category group',  () => {
    const { getAllByTestId } = screen
    render(
      <ItemsProvider>
        <CategoryGroup group={group} />
      </ItemsProvider>
    )
    const items = getAllByTestId('name')
    expect(items.length).toEqual(group.items.length)
  });
})

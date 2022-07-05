import { render } from '@testing-library/react'
import React from 'react'
import { List, OldList } from '../../../models/models'
import HistoryProvider from '../../../providers/HistoryProvider'
import { SeletedList } from './SelectedList'

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

describe('SelectedList', () => {
  let selectedList: List = {
    name: 'Carlos list',
    date: '2022-07-04T18:12:05Z',
    id: 6,
    is_cancelled: false,
    is_completed: true,
    items: [
      {
        id: 3,
        item_id: 5,
        quantity: 4,
        name: 'Apple',
        category_id: 7,
        category_name: 'Fruits',
        is_completed: true
      },
      {
        id: 1,
        item_id: 5,
        quantity: 4,
        name: 'Pineapple',
        category_id: 7,
        category_name: 'Fruits',
        is_completed: true
      },
      {
        id: 8,
        item_id: 1,
        quantity: 2,
        name: 'Chicken breast',
        category_id: 4,
        category_name: 'Meats',
        is_completed: true
      }
    ]
  }
  it('finds the list name, categories and items in the dom', () => {
    const { getAllByTestId, getByTestId } = render(
      <HistoryProvider>
        <SeletedList selectedList={selectedList} />
      </HistoryProvider>
    )

    const listName = getByTestId('list-name')
    const categories = getAllByTestId('category')
    const items = getAllByTestId('item')

    expect(listName.textContent).toEqual(selectedList.name)
    expect(categories.length).toEqual(2)
    expect(items.length).toEqual(3)
  })
})
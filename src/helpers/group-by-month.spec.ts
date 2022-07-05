import { OldList } from "../models/models"
import {createGroupByMonth} from "./group-by-month"

describe('createGroupByMonth', () => {
  let oldList: OldList[] = [
    {
      id: 4,
      date: '2022-08-04T18:12:05Z',
      is_cancelled: false,
      is_completed: true,
      name: 'Primos list'
    },
    {
      id: 3,
      date: '2022-07-04T18:12:05Z',
      is_cancelled: true,
      is_completed: false,
      name: 'Carlos list'
    },
    {
      id: 6,
      date: '2021-07-04T18:12:05Z',
      is_cancelled: true,
      is_completed: false,
      name: 'Albert list'
    },
    {
      id: 1,
      date: '2022-08-04T18:12:05Z',
      is_cancelled: true,
      is_completed: false,
      name: 'kada list'
    },
  ]

  it('gets an ordered by month after passing an array of oldList', () => {
    const orderedList = createGroupByMonth(oldList)
    expect(orderedList.length).toBe(3)
  })
})
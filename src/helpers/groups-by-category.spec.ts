import { ListItem } from "../models/models"
import { createGroupsByCategory, ListItemsGroupByCategory } from "./groups-by-category"

describe('createGroupsByCategory', () => {
  let items: ListItem[] = [
    {
      id: 1, 
      item_id: 2,
      name: "Apple",
      quantity: 4,
      category_id: 2,
      category_name: "Fruits",
      is_completed: false,
    },
    {
      id: 2, 
      item_id: 3,
      name: "Pinapple",
      quantity: 2,
      category_id: 2,
      category_name: "Fruits",
      is_completed: false,
    },
    {
      id: 3, 
      item_id: 4,
      name: "Slice of ribeye",
      quantity: 2,
      category_id: 3,
      category_name: "Meats",
      is_completed: false,
    },
  ]

  it('expects to get an array of "ListItemsGroupByCategory" with no category_name duplicates', () => {
    const itemsFormated = createGroupsByCategory(items)
    const hasDuplicates = itHasDuplicates(itemsFormated)
    expect(hasDuplicates).toBe(false)
  })
})

function itHasDuplicates(groupItems: ListItemsGroupByCategory[]): boolean {
  const listOfIndex: number[] = []

  for (let index = 0; index < groupItems.length; index++) {
    const element = groupItems[index];
    if (listOfIndex.includes(element.category_id)) {
      return true
    } else {
      listOfIndex.push(element.category_id)
    }
  }

  return false
}
import { ListItem } from "../models/models";

export function createGroupsByCategory(
  groupWithDuplicates: ListItem[]
  ): ListItemsGroupByCategory[] {

  if (!groupWithDuplicates) {
    return []
  }

  const groupByCategory: ListItemsGroupByCategory[] = []
  const groupOfCatIds: number[] = [] //Control array

  //Creating groups by categories
  groupWithDuplicates.forEach(g => {
    if (!groupOfCatIds.includes(g.category_id)) {
      groupOfCatIds.push(g.category_id)
      groupByCategory.push({
        category_id: g.category_id,
        category_name: g.category_name,
        items: []
      })
    }
  })

  //Adding items to its groups
  groupWithDuplicates.forEach(e => {
    const group = groupByCategory.find(g => g.category_id === e.category_id)
    group?.items.push(e)
  })

  return groupByCategory
}

export interface ListItemsGroupByCategory {
  category_id: number
  category_name: string
  items: ListItem[]
}
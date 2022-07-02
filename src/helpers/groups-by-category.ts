import { ListItem } from "../models/models";

export function createGroupsByCategory(
  groupWithDuplicates: ListItem[]
  ): ListItemsGroupByCategory[] {

  if (!groupWithDuplicates) {
    return []
  }

  const groupByCategory: ListItemsGroupByCategory[] = []
  const groupOfCatIds: number[] = [] //Control array

  groupWithDuplicates.forEach(group => {

    if (groupOfCatIds.includes(group.category_id)) {
      const equalCat = groupByCategory.find(el => el.category_id = group.category_id)
      equalCat?.items.push(group)
    } else {
      groupByCategory.push({
        category_id: group.category_id,
        category_name: group.category_name,
        items: [group]
      })
      groupOfCatIds.push(group.category_id)
    }
  })
  return groupByCategory
}

export interface ListItemsGroupByCategory {
  category_id: number
  category_name: string
  items: ListItem[]
}
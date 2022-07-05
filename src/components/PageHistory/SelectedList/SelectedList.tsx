import React from "react"
import { useTranslation } from "react-i18next"
import { createGroupsByCategory } from "../../../helpers/groups-by-category"
import { List, GroupOfItemsByCat } from "../../../models/models"
import CategoriesGroups from "../../PageItems/CategoriesGroups/CategoriesGroups"

export function SeletedList({selectedList}: Props) {
  const [ itemGroupsFormatted, setItemGroupsFormatted ] = React.useState<GroupOfItemsByCat[]>()

  React.useEffect(() => {
    setItemGroupsFormatted(createGroupsByCategory(selectedList.items))
  }, [])

  return (
    <>
      <h2 
        className="text-2xl hidden lg:block lg:w-3/5 font-bold text-labels"
        data-testid="list-name"
        >{selectedList.name}</h2>
      
    </>
  )
}

interface Props {
  selectedList: List
}
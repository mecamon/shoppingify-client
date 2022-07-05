import React from "react"
import { useTranslation } from "react-i18next"
import { createGroupsByCategory } from "../../../helpers/groups-by-category"
import { List, GroupOfItemsByCat } from "../../../models/models"
import { useHistory } from "../../../providers/HistoryProvider"
import { OldListItemCard } from "../OldListItemCard/OldListItemCard"

export function SeletedList({selectedList}: Props) {
  const [ itemGroupsFormatted, setItemGroupsFormatted ] = React.useState<GroupOfItemsByCat[]>()

  const { t } = useTranslation()
  const { setSelectedList } = useHistory()

  React.useEffect(() => {
    setItemGroupsFormatted(createGroupsByCategory(selectedList.items))
  }, [])

  return (
    <>
      <button 
        className="flex items-center mb-8" 
        data-testid="back-button"
        onClick={() => setSelectedList(null!)}
        >
        <span className="material-icons text-lg text-accent-2 mr-2">keyboard_backspace</span>
        <span className="text-lg text-accent-2">{t("back")}</span>
      </button>
      <h2 
        className="text-2xl lg:block lg:w-3/5 font-bold text-labels"
        data-testid="list-name"
        >{selectedList.name}
      </h2>
      <div className="flex items-center text-light-text mt-4">
        <span className="material-icons">event_note</span>
        <span className="text-xs">{selectedList.date.split('T')[0]}</span>
      </div>
      {
        itemGroupsFormatted?.map(g => 
          <div
            className="mt-12" 
            key={g.category_id} >
            <span
              className=" text-lg"
              data-testid="category"
               >{g.category_name}
            </span>
            <div className="w-full inline-grid gap-6 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              { g.items.map(i => <OldListItemCard key={i.id} item={i} />)}
            </div>
          </div> 
        )
      }
    </>
  )
}

interface Props {
  selectedList: List
}
import React from "react"
import { useTranslation } from "react-i18next"
import { List, ListItem } from "../../../models/models"
import Bottle from "../../../assets/source.svg"
import CartGirl from "../../../assets/undraw_shopping_app_flsj 1.svg"
import { createGroupsByCategory, ListItemsGroupByCategory } from "../../../helpers/groups-by-category"
import { AritmeticOps, ListSelectedItemLine } from "../ListSelectedItemLine/ListSelectedItemLine"
import { AddItemTopArea } from "../AddItemTopArea/AddItemTopArea"
import { useList } from "../../../providers/ListProvider"
import ListSelectedItemLineComplete from "../ListSelectedItemLineComplete/ListSelectedItemLineComplete"
import ListsEndpoints from "../../../services/rest-api/lists"
import ToggleEditCompleteButton from "../ToggleEditCompleteButton/ToggleEditCompleteButton"
import { useErrorHandler } from "../../../hooks/useErrorHandler"

export default function ListAsideMainContent({updateItems, list, setItemsToDeleteOnClient}: Props) {
  const [listClientData, setListClientData] = React.useState<ListItemsGroupByCategory[]>([])
  const [isLoadingCompleting, setIsLoadingCompleting] = React.useState<boolean>(false)

  const { t } = useTranslation()
  const { isCompleting, setActive } = useList()
  const { httpError } = useErrorHandler()
  
  const listFormatedData = React.useMemo(() => {
    const data = createGroupsByCategory(list?.items)
    setListClientData(data)
    return data
  }, [list])

  function updateClientData(category_id: number, itemSelId: number, operation: AritmeticOps) {
    const newClientData = listClientData.map(l => {
      if (l.category_id === category_id) {
        const group = {...l}
        const item = group.items.find(i => i.id === itemSelId) as ListItem
        if (operation === 'addition') {
          item.quantity++
          updateItems({...item})
        } else {
          if (item.quantity > 1) {
            item.quantity--
            updateItems({...item})
          } 
        }
        return group
      } else {
        return l
      }
    })
    setListClientData(newClientData)
  }
  
  function deleteClientData(category_id: number, itemSelId: number,) {
    const newClientData = listClientData.map(l => {
      if (category_id === l.category_id) {
        const i = l.items.findIndex( el => el.id === itemSelId)
        setItemsToDeleteOnClient(l.items[i].id)
        const {...newGroup} = l
        newGroup.items.splice(i, 1)
        return newGroup
      } else {
        return l
      }
    })
    setListClientData(newClientData)
  } 

  async function complete(id: number) {
    setIsLoadingCompleting(true)
    try {
      await ListsEndpoints.completeSelectedItem({item_sel_id: id})
      await realoadList()
    }catch (e: any) {
      httpError(e)
    } finally {
      setIsLoadingCompleting(false)
    }
  }

  async function realoadList() {
    try {
      const res = await ListsEndpoints.getActive()
      setActive(res.data)
    } catch(e: any) {
      httpError(e)
    }
  }
  
  return (
    <div className="flex flex-col bg-menu-bg h-full px-3 xl:px-11 pb-11">
      <div className="w-full h-1/4 relative p-4">
        <img className="absolute top-0" src={Bottle} alt="bottle icon" />
        <AddItemTopArea />
      </div>
      { (list === null)
          ? <div className="relative w-full h-3/4 flex flex-col items-center px-4">
              <img className="absolute bottom-24 z-50" src={CartGirl} alt="girl with cart" />
              <div className="flex justify-center items-center h-full mb-40 mx-3 sm:mx-10">
                <span data-testid="no-list">{ t("noListCreated") }</span> 
              </div>
            </div>
          : list?.items?.length === 0 || !list?.items
          ? <div className="relative w-full h-3/4 flex flex-col items-center px-4">
              <img className="absolute bottom-24 z-50" src={CartGirl} alt="girl with cart" />
              <div className="flex justify-center items-center h-full mb-40 mx-3 sm:mx-10">
                <span data-testid="no-items">{ t("noItems") }</span> 
              </div>
            </div>
          : <div className="relative w-full h-3/4 flex flex-col px-4">
              <div className="flex justify-between mb-8">
                <h2 className=" text-2xl text-labels">{list.name}</h2>
                <ToggleEditCompleteButton />
              </div>
              <div className="w-full flex flex-col">
                {
                  listClientData.map(group => 
                    <div className="w-full mb-8" key={group.category_id}>
                      <label className="text-sm text-light-text">{group.category_name}</label>
                      <div className="w-full flex flex-col">
                        { 
                          group.items.map(item => 
                            isCompleting
                            ? <ListSelectedItemLineComplete
                                listItem={item}
                                complete={complete}
                                key={item.id}
                                />
                            : <ListSelectedItemLine 
                                listItem={item}
                                updateClientData={updateClientData}
                                deleteClientData={deleteClientData} 
                                key={item.id} /> 
                          )
                        }
                      </div>            
                    </div>
                  )
                }
              </div>
            </div>
      }
    </div>
  )
}

interface Props {
  updateItems: (listItem: ListItem) => void
  setItemsToDeleteOnClient: (id: number) => void
  list: List
}
import React from "react"
import { useTranslation } from "react-i18next"
import { List } from "../../../models/models"
import Bottle from "../../../assets/source.svg"
import CartGirl from "../../../assets/undraw_shopping_app_flsj 1.svg"
import { createGroupsByCategory } from "../../../helpers/groups-by-category"
import { ListSelectedItemLine } from "../ListSelectedItemLine/ListSelectedItemLine"

export default function ListAsideMainContent({addItem, list}: Props) {
  const { t } = useTranslation()
  
  const listFormatedData = React.useMemo(() => {
    return createGroupsByCategory(list?.items)
  }, [list])

  return (
    <div className="flex flex-col bg-menu-bg h-full px-3 xl:px-11 pb-11">
      <div className="w-full h-1/4 relative p-4">
        <img className="absolute top-0" src={Bottle} alt="bottle icon" />
        <div className=" w-full p-5 flex justify-end bg-accent-1 rounded-xl">
          {
            list !== null 
              ? <div className=" w-2/3">
                  <span className="block text-white mb-2">{ t("sbItemMessage") }</span>
                  <button 
                    className="bg-white hover:bg-slate-100 py-3 px-7 text-lg text-labels font-bold rounded-xl"
                    data-testid="add-item" 
                    onClick={() => addItem()}>{ t("addItem") }</button>
                </div>
              : <div className=" w-2/3">
                  <span 
                    className="block text-white mb-2"
                    data-testid="no-active-list"
                    >{ t("noListCreated") }</span>
                </div>
          }
        </div>
      </div>
      { (list?.items?.length === 0 || !list?.items || list === null)
          ? <div className="relative w-full h-3/4 flex flex-col items-center px-4">
              <img className="absolute bottom-24 z-50" src={CartGirl} alt="girl with cart" />
              <div className="flex justify-center items-center h-full mb-40">
                <span data-testid="no-items">{ t("noItems") }</span> 
              </div>
            </div>
          : <div className="relative w-full h-3/4 flex flex-col px-4">
              <div className="flex justify-between mb-8">
                <h2 className=" text-2xl text-labels">{list.name}</h2>
                <div>
                  <button className="rounded-full bg-traslucid h-10 w-10 mx-2">
                    <span className="material-icons text-labels text-2xl">edit</span>
                  </button>
                  <button className="rounded-full bg-traslucid h-10 w-10 mx-2">
                    <span className="material-icons text-labels text-2xl">done</span>
                  </button>
                </div> 
              </div>
              <div className="w-full flex flex-col">
                {
                  listFormatedData.map(group => 
                    <div className="w-full mb-8" key={group.category_id}>
                      <label className="text-sm text-light-text">{group.category_name}</label>
                      <div className="w-full flex flex-col">
                        { 
                          group.items.map(item => <ListSelectedItemLine listItem={item} key={item.id} /> )
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
  addItem: () => void
  list: List
}
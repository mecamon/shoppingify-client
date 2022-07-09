import React from "react"
import {GroupOfItemsByCat} from "../../../models/models"
import ItemCard from "../ItemCard/ItemCard"
import {useItems} from "../../../providers/ItemsProvider"
import ItemsEndpoints from "../../../services/rest-api/items"
import { useList } from "../../../providers/ListProvider"
import { useErrorHandler } from "../../../hooks/useErrorHandler"

export default function CategoryGroup({ group }: Props) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const { setItemDetails } = useItems()
  const { setAsideMode } = useList()
  const { httpError } = useErrorHandler()

  async function getItem(id: number) {
    setIsLoading(true)
    try {
      const res = await ItemsEndpoints.getById(id)
      setItemDetails(res.data)
      setAsideMode('ItemDetails')
    } catch (e: any) {
      httpError(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="mb-10">
      <h2 data-testid="category" className="text-lg mb-4">{group.category_name}</h2>
      <div className="w-full inline-grid gap-6 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        { group.items.map(item =>
            <div key={item.id}>
              <ItemCard item={item} selectItem={getItem} />
            </div>
        ) }
      </div>
    </section>
  )
}

interface Props {
  group: GroupOfItemsByCat
}

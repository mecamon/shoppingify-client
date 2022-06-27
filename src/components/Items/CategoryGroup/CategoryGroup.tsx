import React from "react";
import {GroupOfItemsByCat} from "../../../models/models";
import ItemCard from "../ItemCard/ItemCard";
import {useItems} from "../../../providers/ItemsProvider";
import ItemsEndpoints from "../../../services/rest-api/items";

export default function CategoryGroup({ group }: Props) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [hasError, setHasError] = React.useState<any>(null)

  const { setItemDetails } = useItems()

  async function getItem(id: number) {
    setIsLoading(() => true)
    try {
      const res = await ItemsEndpoints.getById(id)
      setItemDetails(() => res.data)
    } catch (e: any) {
      setHasError(() => e.response.data)
    } finally {
      setIsLoading(() => false)
    }
  }

  return (
      <section className="mb-10">
        <h2 data-testid="category" className="text-lg mb-4">{group.category_name}</h2>
        <div className="w-full inline-grid gap-6 grid-cols-4">
          { group.items.map(item =>
              <div key={item.id}>
                <ItemCard item={item} selectItem={async () => getItem(item.id)} />
              </div>
          ) }
        </div>
      </section>
  )
}

interface Props {
  group: GroupOfItemsByCat
}

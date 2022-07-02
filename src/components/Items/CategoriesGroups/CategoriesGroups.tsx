import { useItems} from "../../../providers/ItemsProvider";
import React from "react";
import ItemsEndpoints from "../../../services/rest-api/items";
import CategoryGroup from "../CategoryGroup/CategoryGroup";

export default function CategoriesGroups() {
  const { groups, setGroups } = useItems()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [hasErr, setHasErr] = React.useState<any>(null!)

  React.useEffect(() => {
    async function fetchItems() {
      if (groups?.length === 0) await fetchData()
    }
    fetchItems()
  }, [])

  async function fetchData() {
    setIsLoading(() => true)
    try {
      const res = await ItemsEndpoints.itemsByCategoryGroup(4, 0)
      setGroups(res.data)
    }catch (e: any) {
      setHasErr(() => e.response.data)
    } finally {
      setIsLoading(() => false)
    }
  }

  return (
      <div className="mt-16">
        { groups && groups.map((group) => <CategoryGroup group={group} key={group.category_id} />) }
      </div>
  )
}



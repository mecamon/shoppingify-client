import { useItems} from "../../../providers/ItemsProvider"
import React from "react"
import ItemsEndpoints from "../../../services/rest-api/items"
import CategoryGroup from "../CategoryGroup/CategoryGroup"
import { useErrorHandler } from "../../../hooks/useErrorHandler"
import HCardsSkeletonLoader from "../../shared/HCardsSkeletonLoader/HCardsSkeletonLoader"

export default function CategoriesGroups() {
  const { groups, setGroups } = useItems()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const { httpError } = useErrorHandler()

  React.useEffect(() => {
    async function fetchItems() {
      if (groups?.length === 0) await fetchData()
    }
    fetchItems()
  }, [])

  async function fetchData() {
    setIsLoading(() => true)
    try {
      const res = await ItemsEndpoints.itemsByCategoryGroup()
      setGroups(res.data)
    }catch (e: any) {
      httpError(e)
    } finally {
      setIsLoading(() => false)
    }
  }

  if (isLoading) {
    return (
      <div className="mt-16">
        <section className="mb-10">
          <div className="w-full inline-grid gap-6 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <HCardsSkeletonLoader />
            <HCardsSkeletonLoader />
            <HCardsSkeletonLoader />
            <HCardsSkeletonLoader />
          </div>
        </section>
      </div>
    )
  } else {
    return (
      <div className="mt-16">
        { groups && groups.map((group) => <CategoryGroup group={group} key={group.category_id} />) }
      </div>
    )
  }
}

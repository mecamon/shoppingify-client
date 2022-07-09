import { useItems} from "../../../providers/ItemsProvider"
import React from "react"
import CategoryGroup from "../CategoryGroup/CategoryGroup"
import HCardsSkeletonLoader from "../../shared/HCardsSkeletonLoader/HCardsSkeletonLoader"

export default function CategoriesGroups() {
  const { groups, getItems, isLoading } = useItems()

  React.useEffect(() => {
    ;(async () => {
      await getItems('')
    })()
  }, [])

  if (isLoading) {
    return (
      <div className="mt-16 min">
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

import { useTranslation } from "react-i18next"
import { useMonth } from "../../../hooks/useMonth"
import { ListGroupByMonth } from "../../../models/models"
import OldListCard from "../OldListCard/OldListCard"

export function HMainContent({listGroupByMonth}: Props) {
  const { t } = useTranslation()
  const { monthStrToName } = useMonth()

  return (
    <>
      <div id="head" className="flex justify-between">
        <div className="w-full">
          <h2 className="text-2xl lg:block lg:w-3/5 font-bold text-labels">{t("shoppingHistory")}</h2>
          {
            <h3 className=" text-xl text-light-text">{t("noListInHistory")}</h3>
          }
        </div>
      </div>
      <section className="mt-9">
        { listGroupByMonth.map(g => 
          <div key={g.month_number + g.year} >
            <h3 className="text-xs mb-4">
              { monthStrToName(g.month_number) + ' ' + g.year }
            </h3> 
            {g.oldList.map(l => <OldListCard key={l.id} oldList={l} />)}
          </div>
        )}
      </section>
    </>
  )
}

interface Props {
  listGroupByMonth: ListGroupByMonth[]
}
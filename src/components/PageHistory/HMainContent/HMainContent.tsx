import { useTranslation } from "react-i18next"
import { ListGroupByMonth } from "../../../models/models"
import OldListCard from "../OldListCard/OldListCard"

export function HMainContent({listGroupByMonth}: Props) {
  const { t } = useTranslation()

  function monthNumberToName(monthNumber: string): string {
    switch(monthNumber) {
      case '01':
        return t("jan")
      case '02':
        return t("feb")
      case '03':
        return t("mar")
      case '04':
        return t("apr")
      case '05':
        return t("may")
      case '06':
        return t("jun")
      case '07':
        return t("jul")
      case '08':
        return t("aug")
      case '09':
        return t("sep")
      case '10':
        return t("oct")
      case '11':
        return t("nov")
      case '12':
        return t("dec")
      default:
        return "no month"
    }
  }

  return (
    <section className="mt-9">
      { listGroupByMonth.map(g => 
        <div key={g.month_number + g.year} >
          <h3 className="text-xs mb-4">
            { monthNumberToName(g.month_number) + ' ' + g.year }
          </h3> 
          {g.oldList.map(l => <OldListCard key={l.id} oldList={l} />)}
        </div>
      )}
    </section>
  )
}

interface Props {
  listGroupByMonth: ListGroupByMonth[]
}
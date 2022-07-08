import { useTranslation } from "react-i18next"

export function useMonth() {
  const { t } = useTranslation()

  function monthNumberToName(monthNumber: number): string {
    switch(monthNumber) {
      case 1:
        return t("jan")
      case 2:
        return t("feb")
      case 3:
        return t("mar")
      case 4:
        return t("apr")
      case 5:
        return t("may")
      case 6:
        return t("jun")
      case 7:
        return t("jul")
      case 8:
        return t("aug")
      case 9:
        return t("sep")
      case 10:
        return t("oct")
      case 11:
        return t("nov")
      case 12:
        return t("dec")
      default:
        return "no month"
    }
  }

  function monthStrToName(monthNumber: string): string {
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

  return { monthNumberToName, monthStrToName }
}
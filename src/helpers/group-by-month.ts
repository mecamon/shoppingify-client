import React from "react"
import { ListGroupByMonth, OldList } from "../models/models"

export function createGroupByMonth(oldList: OldList[]): ListGroupByMonth[] {
  const listGroupByMonth: ListGroupByMonth[] = []
  const controlArray: string[] = []

  oldList?.forEach(list => {
    const monthAndYear = getDateMonthAndYear(list.date)

    if (!controlArray.includes(monthAndYear)) {
      controlArray.push(monthAndYear)
      const dashIndex = monthAndYear.indexOf('-')
      listGroupByMonth.push({
        month_number: monthAndYear.substring(dashIndex+1),
        year: monthAndYear.substring(0, dashIndex),
        oldList: [] 
      })
    }
  })

  oldList?.forEach(list => {
    const monthAndYear = getDateMonthAndYear(list.date)
    const dashIndex = monthAndYear.indexOf('-')
    const year = monthAndYear.substring(0, dashIndex)
    const month = monthAndYear.substring(dashIndex+1, dashIndex+3)

    for (let index = 0; index < listGroupByMonth.length; index++) {
      const element = listGroupByMonth[index]

      if (element.month_number === month && element.year === year) {
        element.oldList.push(list)
      }
    }
  })
  return listGroupByMonth
}

function getDateMonthAndYear(date: string): string {
  const dashIndex = date.indexOf('-')
  const monthAndYear: string = date.substring(0, dashIndex + 3)
  return monthAndYear
}

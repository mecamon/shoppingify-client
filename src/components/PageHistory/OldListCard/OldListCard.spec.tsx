import { render } from "@testing-library/react"
import { OldList } from "../../../models/models"
import OldListCard from "./OldListCard"
import React from "react"
import HistoryProvider from "../../../providers/HistoryProvider"
import AuthProvider from "../../../providers/AuthProvider"

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str:any) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}))

describe('OldListCard', () => {
  let oldList1: OldList = {
    id: 3,
    date: "2022-07-04T18:12:05Z",
    is_cancelled: false,
    is_completed: true,
    name: "Kadas list"
  }

  let oldList2: OldList = {
    id: 3,
    date: "2022-07-04T18:12:05Z",
    is_cancelled: true,
    is_completed: false,
    name: "Kadas list"
  }

  it('finds the list name and the status completed', () => {
    const {getByTestId} = render(
      <AuthProvider>
        <HistoryProvider>
          <OldListCard oldList={oldList1} />
        </HistoryProvider>
      </AuthProvider>
    )

    const name = getByTestId('name')
    const status = getByTestId('status-completed')

    expect(name.textContent).toEqual(oldList1.name)
    expect(status).toBeInTheDocument()
  })

  it('finds the status completed', () => {
    const {getByTestId} = render(
      <AuthProvider>
        <HistoryProvider>
          <OldListCard oldList={oldList2} />
        </HistoryProvider>
      </AuthProvider>
      
    )

    const status = getByTestId('status-cancelled')
    expect(status).toBeInTheDocument()
  })
})
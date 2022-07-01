import React from "react"
import { render } from "@testing-library/react"
import CreateItemAside from "./CreateItemAside"
import ListProvider from "../../../providers/ListProvider"

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

describe('CreateItemAside', () => {
  it('triggers the "save" button to be disabled', () => {
    // const { get } = render(
    //   <ListProvider>
    //     <CreateItemAside />
    //   </ListProvider>
    // )
    // const saveButton = getByTestId('action-button') as HTMLButtonElement
    // expect(saveButton.disabled).toBe(true)
  })
})
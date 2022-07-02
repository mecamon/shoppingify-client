import React from "react"
import { fireEvent, render } from "@testing-library/react"
import AddItemSB from "./AddItemMainContent" 
import { ItemFormValues } from "..";

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

describe('AddItemSB', () => {
  let setFormValues = jest.fn()
  let formValues: ItemFormValues = {
    category_id: 0,
    category_name: '',
    file: null!,
    name: '',
    note: '',
  }
  
  it('clears the item name input after clicking the "X" icon', () => {
    const { getByTestId } = render(
      <AddItemSB  
        formValues={formValues} 
        setFormValues={setFormValues} 
        />)
    const categoryNameInput = getByTestId('category-name') as HTMLInputElement
    const crossIcon = getByTestId('cross-button')

    fireEvent.change(categoryNameInput, {target: {value: 'Fruits'}})
    fireEvent.click(crossIcon)
    expect(categoryNameInput.value).toBe('')
  })
})
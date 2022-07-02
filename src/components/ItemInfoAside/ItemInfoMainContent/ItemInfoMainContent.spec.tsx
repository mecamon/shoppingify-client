import React from "react"
import { fireEvent, render } from "@testing-library/react"
import { Item, ItemDetailed } from "../../../models/models"
import AddItemToListSB from "./ItemInfoMainContent"

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

describe('AddItemToListSB', () => {
  const itemDetails: ItemDetailed = {
    id: 2,
    name: 'Apple',
    note: 'This is a note',
    category_id: 1,
    category_name: 'Fruits',
    image_url: 'http://randomimageurl.xyz/'
  }
  let backToList = jest.fn()

  it('expect to find the info pass by the props rendered in the dom', () => {
    const { getByTestId } = render(<AddItemToListSB itemDetails={itemDetails} backToList={backToList}/>)
    const name = getByTestId('name')
    const note = getByTestId('note')
    const categoryName = getByTestId('category-name')
    const image = getByTestId('image') as HTMLImageElement

    expect(name.textContent).toEqual(itemDetails.name)
    expect(note.textContent).toEqual(itemDetails.note)
    expect(categoryName.textContent).toEqual(itemDetails.category_name)
    expect(image.src).toEqual(itemDetails.image_url)
  })

  it('trigger the "backToList" function after clicking on back', () => {
    const { getByTestId } = render(<AddItemToListSB itemDetails={itemDetails} backToList={backToList}/>)
    const backButton = getByTestId('back-button')
    fireEvent.click(backButton)
    expect(backToList).toHaveBeenCalledTimes(1)
  })
})
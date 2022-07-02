import React from "react"
import { fireEvent, render } from "@testing-library/react"
import { Category } from "../../../models/models"
import CategoriesFound from "./CategoriesFound"

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

describe('CategoriesFound', () => {
  let categoriesSuggested: Category[] = [
    {id: 1, name: 'Fruits'},
    {id: 2, name: 'Vegetables'},
  ]
  let selectCategory = jest.fn()
  let createCategory = jest.fn()
  let categoryInputValue = 'dasdasd'

  beforeEach(() => {
    selectCategory.mockClear()
    createCategory.mockClear()
  })

  it('Finds the categories passed in the prop', () => {
    const { getAllByTestId } = render(
      <CategoriesFound 
        categoriesSuggested={categoriesSuggested} 
        selectCategory={selectCategory} 
        createCategory={createCategory}
        categoryInputValue={categoryInputValue}
        />)
    const categories = getAllByTestId('suggested-category')
    categories.forEach((cat, i) => {
      expect(categoriesSuggested[i].name).toEqual(cat.textContent)
    })
  })

  it('triggers function "selectCategory" after clicking a category', () => {
    const { getAllByTestId } = render(
      <CategoriesFound 
        categoriesSuggested={categoriesSuggested} 
        selectCategory={selectCategory} 
        createCategory={createCategory}
        categoryInputValue={categoryInputValue}
        />
    )
    const categories = getAllByTestId('suggested-category')
    fireEvent.click(categories[0])
    expect(selectCategory).toHaveBeenCalledTimes(1)
  })

  it('triggers function "createCategory" after clicking a category', () => {
    const { getAllByTestId } = render(
      <CategoriesFound 
        categoriesSuggested={categoriesSuggested} 
        selectCategory={selectCategory} 
        createCategory={createCategory}
        categoryInputValue={categoryInputValue}
        />
    )
    const categories = getAllByTestId('create-category')
    fireEvent.click(categories[0])
    expect(createCategory).toHaveBeenCalledTimes(1)
  })
})
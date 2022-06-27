import React from "react";
import { render, fireEvent } from "../../../../__mocks__/router-utils"
import SearchBar from "./SearchBar";


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

describe('SearchBar', () => {
  let fullTextSearch: jest.Mock;
  beforeEach(() => {
    fullTextSearch = jest.fn()
  })
  beforeAll(() => {
    
  })
  afterEach(() => {
    fullTextSearch.mockClear()
  })

  it('triggers the fulltext search function on input > 2',  () => {
      const { getByTestId } = render(<SearchBar fullTextSearch={ fullTextSearch } />)
      const inputSearch = getByTestId('search-input') as HTMLInputElement

      fireEvent.input(inputSearch, {target: {value: 'new search'}})

      expect(inputSearch).toBeInTheDocument()
      expect(fullTextSearch).toHaveBeenCalled()
  });

  it('does NOT trigger the fulltext search function on input < 3',  () => {
    const { getByTestId } = render(<SearchBar fullTextSearch={ fullTextSearch } />)
    const inputSearch = getByTestId('search-input') as HTMLInputElement

    fireEvent.input(inputSearch, {target: {value: 'ne'}})

    expect(inputSearch).toBeInTheDocument()
    expect(fullTextSearch).not.toHaveBeenCalled()
  });
})

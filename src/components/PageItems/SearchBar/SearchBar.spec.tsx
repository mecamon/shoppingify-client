import React from "react";
import { render, fireEvent } from "../../../../__mocks__/router-utils"
import AuthProvider from "../../../providers/AuthProvider";
import ItemsProvider from "../../../providers/ItemsProvider";
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

  it('triggers the fulltext search function on change',  () => {
      const { getByTestId } = render(
        <AuthProvider>
          <ItemsProvider>
            <SearchBar />
          </ItemsProvider>
        </AuthProvider>
        )
      const inputSearch = getByTestId('search-input') as HTMLInputElement

      fireEvent.input(inputSearch, {target: {value: 'new search'}})

      expect(inputSearch).toBeInTheDocument()
  });
})

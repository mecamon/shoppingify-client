import {fireEvent, render} from '../../../../__mocks__/router-utils'
import NavBar from "./NavBar"
import React from "react";
import ListProvider from '../../../providers/ListProvider';
import { ModalProvider } from '../../../providers/ModalProvider';

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

describe('NavBar', () => {
  let toggleSideBarOnMobile = jest.fn()
  it('finds the nav items', () => {
    const {getByTestId} = render(
      <ModalProvider>
        <ListProvider>
          <NavBar toggleSideBarOnMobile={toggleSideBarOnMobile} />
        </ListProvider>
      </ModalProvider>
    )

    const items = getByTestId('items-nav')
    const history = getByTestId('history-nav')
    const statistics = getByTestId('statistics-nav')
    const logo = getByTestId('logo')
    const cart = getByTestId('cart')
    const itemCount = getByTestId('item-count')

    expect(items).toBeInTheDocument()
    expect(history).toBeInTheDocument()
    expect(statistics).toBeInTheDocument()
    expect(logo).toBeInTheDocument()
    expect(cart).toBeInTheDocument()
    expect(itemCount).toBeInTheDocument()
  });

  it('triggers the "toggleSideBarOnMobile" when clicking the cart', () => {
    const {getByTestId} = render(
      <ModalProvider>
        <ListProvider>
          <NavBar toggleSideBarOnMobile={toggleSideBarOnMobile} />
        </ListProvider>
      </ModalProvider>
    )
    const cartButton = getByTestId('cart')
    fireEvent.click(cartButton)
    expect(toggleSideBarOnMobile).toHaveBeenCalledTimes(1)
  })
})

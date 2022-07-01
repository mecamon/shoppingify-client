import {fireEvent, render} from '../../../../__mocks__/router-utils'
import NavBar from "./NavBar"
import React from "react";
import ListProvider from '../../../providers/ListProvider';

describe('NavBar', () => {
  let toggleSideBarOnMobile = jest.fn()
  it('finds the nav items', () => {
    const {getByTestId} = render(
      <ListProvider>
        <NavBar toggleSideBarOnMobile={toggleSideBarOnMobile} />
      </ListProvider>
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
      <ListProvider>
        <NavBar toggleSideBarOnMobile={toggleSideBarOnMobile} />
      </ListProvider>
    )
    const cartButton = getByTestId('cart')
    fireEvent.click(cartButton)
    expect(toggleSideBarOnMobile).toHaveBeenCalledTimes(1)
  })
})

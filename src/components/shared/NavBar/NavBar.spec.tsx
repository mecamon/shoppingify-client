import {render} from '../../../../__mocks__/router-utils'
import NavBar from "./NavBar"
import React from "react";

describe('NavBar', () => {
  it('finds the nav items', () => {
    const {getByTestId} = render(<NavBar />)

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
})

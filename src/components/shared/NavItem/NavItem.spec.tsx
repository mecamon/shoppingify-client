import { render } from '../../../../__mocks__/router-utils'
import userEvents from '@testing-library/user-event'
import React from "react";
import NavItem from "./NavItem";

describe('NavItem',  () => {
  it('spec to find the NavItem label when hovered',  () => {

    const icon= <span id="link-icon" className="material-icons text-icons text-xl text-center w-full">list</span>
    const path="/"
    const dataTestId="items-nav"
    const label = "Items"

    const {getByTestId} = render(<NavItem  icon={icon} path={path} dataTestId={dataTestId} label={label} />)
    const item = getByTestId(dataTestId)
    const labelTag = getByTestId('label')

    userEvents.hover(item)
    expect(labelTag).toBeInTheDocument()
  });
});

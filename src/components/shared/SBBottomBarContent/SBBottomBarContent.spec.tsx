import React from "react"
import { fireEvent, render } from "@testing-library/react"
import SBBottomBarContent from "./SBBottomBarContent"

describe('SBBottomBarContent', () => {
  let onClick = jest.fn()
  let placeholder = 'Enter name'
  let buttonlabel = 'Create'

  it('it finds placeholder and buttonlabel props as text in the document', () => {
    const { getByTestId, getByPlaceholderText } = render(
      <SBBottomBarContent 
        onClick={onClick} 
        placeholder={placeholder} 
        buttonLabel={buttonlabel} />
      )
    const input = getByPlaceholderText(placeholder)
    const button = getByTestId('action-button')
    expect(input).toBeInTheDocument()
    expect(button.textContent).toEqual(buttonlabel)
  })

  it('it triggers onClick function after clicking the button', () => {
    const { getByTestId, getByPlaceholderText } = render(
      <SBBottomBarContent 
        onClick={onClick} 
        placeholder={placeholder} 
        buttonLabel={buttonlabel} />
      )
    const button = getByTestId('action-button')
    fireEvent.click(button)
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
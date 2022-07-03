import React from "react"
import { fireEvent, render } from "@testing-library/react"
import BottomBarContent from "./BottomBarContent"

describe('BottomBarContent', () => {
  let onClick = jest.fn()
  let placeholder = 'Enter name'
  let buttonlabel = 'Create'

  it('it finds placeholder and buttonlabel props as text in the document', () => {
    const { getByTestId, getByPlaceholderText } = render(
      <BottomBarContent 
        isLoading={false}
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
    const { getByTestId } = render(
      <BottomBarContent 
        isLoading={false}
        onClick={onClick} 
        placeholder={placeholder} 
        buttonLabel={buttonlabel} />
      )
    const inputText = getByTestId('input-text')
    fireEvent.change(inputText,  {target: {value: 'some data'}})
    const button = getByTestId('action-button')
    fireEvent.click(button)
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
import React from "react"
import { fireEvent, render } from "@testing-library/react"
import SBBottomBarButton from "./SBBottomBarButton"

describe('SBBottomBarButton', () => {
  let buttonLabel = "Save"
  let onClick = jest.fn()
  it('find the props buttonLabel', () => {
    const { getByTestId } = render(
      <SBBottomBarButton
        bgClassColor=""
        textClassColor=""
        isLoading={false} 
        buttonLabel={buttonLabel} 
        onClick={null!}
        />)
    const buttonLabelSpan = getByTestId('button-label')
    expect(buttonLabelSpan.textContent).toEqual(buttonLabel)
  })

  it('triggers the onClick function after clicking the button', () => {
    const { getByTestId } = render(
      <SBBottomBarButton
        bgClassColor=""
        textClassColor=""
        isLoading={false} 
        buttonLabel={buttonLabel} 
        onClick={onClick}
        />)
    const button = getByTestId('action-button')
    fireEvent.click(button)
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
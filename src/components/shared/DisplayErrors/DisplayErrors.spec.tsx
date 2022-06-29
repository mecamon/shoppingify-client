import { render } from '@testing-library/react'
import DisplayErrors from './DisplayErrors'
import React from 'react'

describe('DisplayErrors', () => {
  it('Shows an array of messages when gets an object as error prop', () => {
    const errs = {
      email: "incorrect email format",
      password: "password must have at least A-Z, a-z and 0-9 characters in it"
    }

    const { getAllByTestId } = render(<DisplayErrors errs={errs}/>)
    const messageTags = getAllByTestId('err-message')
    const values = Object.values(errs)

    expect(messageTags.length).toEqual(Object.values(errs).length)
    messageTags.forEach((el, i) => {
      expect(el.textContent).toEqual(values[i])
    })
  })

  it('Shows an array of messages when gets an array as error prop', () => {
    const errs = [
      "incorrect email format",
      "password must have at least A-Z, a-z and 0-9 characters in it",
    ]

    const { getAllByTestId } = render(<DisplayErrors errs={errs}/>)
    const messageTags = getAllByTestId('err-message')

    expect(messageTags.length).toEqual(Object.values(errs).length)
    messageTags.forEach((el, i) => {
      expect(el.textContent).toEqual(errs[i])
    })
  })

  it('Shows the string message when gets an string as error prop', () => {
    const err = "password must have at least A-Z, a-z and 0-9 characters in it"
    
    const { getAllByTestId } = render(<DisplayErrors errs={err}/>)
    const messageTags = getAllByTestId('err-message')

    expect(messageTags.length).toEqual(1)
    expect(messageTags[0].textContent).toEqual(err)
  })
})
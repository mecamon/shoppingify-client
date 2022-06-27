import { render, fireEvent } from '../../../../__mocks__/router-utils'
import React from 'react'
import { AuthState } from '../../../providers/AuthProvider';
import LoginForm from './LoginForm'

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

describe('LoginForm', () => {
  let anonymousLogin: () => Promise<void>;
  let state: AuthState;
  let initialState: AuthState = {
    isLoading: false,
    isAuthenticated: false,
    err: null
  }
  beforeAll(() => {
    anonymousLogin = jest.fn()
    state = initialState
  })

  it('fill form values', () => {
    const { getByTestId } = render(<LoginForm anonymousLogin={anonymousLogin} state={state} />)

    const emailInput = getByTestId('email') as HTMLInputElement
    const passwordInput = getByTestId('password') as HTMLInputElement

    fireEvent.change(emailInput, {target: {value: 'people@mail.com'}})
    fireEvent.change(passwordInput, {target: {value: '123453fadrda'}})

    expect(emailInput.value).toBe('people@mail.com') 
    expect(passwordInput.value).toBe('123453fadrda')
  })

  it('it triggers the anonymousLogin function', () => {
    const { getByTestId } = render(<LoginForm anonymousLogin={anonymousLogin} state={state}/>)
    const anonymousLoginBtn = getByTestId('anonymous-login')
    fireEvent.click(anonymousLoginBtn)
    expect(anonymousLogin).toHaveBeenCalledTimes(1)
  })
})
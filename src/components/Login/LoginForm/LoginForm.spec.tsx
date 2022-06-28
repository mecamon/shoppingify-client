import { render, fireEvent } from '../../../../__mocks__/router-utils'
import LoginForm from './LoginForm'
import { LoginInfo } from '../../../models/models';
import React from 'react'

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
  let loginInfo: LoginInfo;
  let updateLoginInfo = jest.fn()
  let visitorLogin = jest.fn()
  let regularLogin = jest.fn()
  let toggleAuthMode = jest.fn()

  beforeEach(() => {
    loginInfo = {email: "", password: ""}
    updateLoginInfo.mockClear()
    visitorLogin.mockClear()
    regularLogin.mockClear()
  })

  it('fill form values', () => {
    const { getByTestId } = render(
      <LoginForm 
        loginInfo={loginInfo} 
        updateLoginInfo={updateLoginInfo} 
        visitorLogin={visitorLogin} 
        regularLogin={regularLogin} 
      />
    )

    const emailInput = getByTestId('email') as HTMLInputElement
    const passwordInput = getByTestId('password') as HTMLInputElement

    fireEvent.change(emailInput, {target: {value: 'people@mail.com'}})
    fireEvent.change(passwordInput, {target: {value: '123453fadrda'}})

    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(updateLoginInfo).toHaveBeenCalled()
  })

  it('it triggers the anonymousLogin function', () => {
    const { getByTestId } = render(
      <LoginForm 
        loginInfo={loginInfo} 
        updateLoginInfo={updateLoginInfo} 
        visitorLogin={visitorLogin} 
        regularLogin={regularLogin} 
      />
    )
    const anonymousLoginBtn = getByTestId('visitor-login')
    fireEvent.click(anonymousLoginBtn)
    expect(visitorLogin).toHaveBeenCalledTimes(1)
  })

  it('it calls the "toggleAuthMode" after clicking the toggle button', () => {
    const { getByTestId } = render(
      <LoginForm 
        loginInfo={loginInfo} 
        updateLoginInfo={updateLoginInfo} 
        visitorLogin={visitorLogin} 
        regularLogin={regularLogin} 
        toggleAuthMode={toggleAuthMode}
      />
    )

    const toggleAuthBtn = getByTestId('toggle-auth-mode') as HTMLButtonElement
    fireEvent.click(toggleAuthBtn)
    expect(toggleAuthMode).toHaveBeenCalledTimes(1)
  })
})
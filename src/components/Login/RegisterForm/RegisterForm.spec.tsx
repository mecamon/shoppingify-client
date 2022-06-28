import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import RegisterForm from './RegisterForm'
import { RegisterInfo } from '..';

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

describe('RegisterForm', () => {
  let registerInfo: RegisterInfo = {
    email: '',
    emailIsValid: null!,
    password: '',
    passwordIsValid: null!,
    name: '',
    nameIsValid: null!,
    lastname: '',
    lastnameIsValid: null!,
  } 
  let updateFields = jest.fn()
  let registerNewUser = jest.fn()
  let toggleAuthMode = jest.fn()

  beforeEach(() => {
    updateFields.mockClear()
    updateFields.mockClear()
  })

  it('triggers update field function on every input to fields', () => {
    const { getByTestId } = render(
      <RegisterForm 
        registerInfo={registerInfo} 
        updateFields={updateFields} 
        registerNewUser={registerNewUser}
        toggleAuthMode={toggleAuthMode}
        />
    )
    const emailInput = getByTestId('email') as HTMLInputElement
    const passwordInput = getByTestId('password') as HTMLInputElement
    const nameInput = getByTestId('name') as HTMLInputElement
    const lastnameInput = getByTestId('lastname') as HTMLInputElement

    fireEvent.change(emailInput, {target: {value: 'some@mail.com'}})
    fireEvent.change(passwordInput, {target: {value: 'validPass123'}})
    fireEvent.change(nameInput, {target: {value: 'Don Falcon'}})
    fireEvent.change(lastnameInput, {target: {value: 'Pinini'}})

    expect(updateFields).toHaveBeenCalledTimes(4)
  })

  it('enables the input button when all fields are filled', () => {
    const { getByTestId } = render(
      <RegisterForm 
        registerInfo={registerInfo} 
        updateFields={updateFields} 
        registerNewUser={registerNewUser}
        toggleAuthMode={toggleAuthMode}
        />
    )
    const emailInput = getByTestId('email') as HTMLInputElement
    const passwordInput = getByTestId('password') as HTMLInputElement
    const nameInput = getByTestId('name') as HTMLInputElement
    const lastnameInput = getByTestId('lastname') as HTMLInputElement
    const form = getByTestId('register-form') as HTMLFormElement

    fireEvent.change(emailInput, {target: {value: 'some@'}})
    fireEvent.change(passwordInput, {target: {value: 'dad'}})
    fireEvent.change(nameInput, {target: {value: 'Don'}})
    fireEvent.change(lastnameInput, {target: {value: 'dasdadv'}})
    fireEvent.submit(form)
    
    expect(registerNewUser).toHaveBeenCalledTimes(1)
  })

  it('calls the function "toggleAuthMode" when clicking the loginMode button', () => {
    const { getByTestId } = render(
      <RegisterForm 
        registerInfo={registerInfo} 
        updateFields={updateFields} 
        registerNewUser={registerNewUser}
        toggleAuthMode={toggleAuthMode}
        />)
    const toggleAuthBtn = getByTestId('toggle-auth-mode') as HTMLButtonElement
    fireEvent.click(toggleAuthBtn)
    expect(toggleAuthMode).toBeCalledTimes(1)
  })
})
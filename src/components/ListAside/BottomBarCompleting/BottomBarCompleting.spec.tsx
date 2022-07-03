import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import BottomBarCompleting from './BottomBarCompleting'

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

describe('BottomBarCompleting', () => {
  let cancel = jest.fn()
  let complete = jest.fn()

  it('triggers "cancel" and "complete" function after clicks', () => {
    const { getByTestId } = render(
      <BottomBarCompleting 
        cancel={cancel} 
        complete={complete} 
        isLoading={false} />)

    const cancelButton = getByTestId('cancel-button')
    const completeButton = getByTestId('complete-button')

    fireEvent.click(cancelButton)
    fireEvent.click(completeButton)

    expect(cancel).toHaveBeenCalledTimes(1)
    expect(complete).toHaveBeenCalledTimes(1)
  })
})
import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import BottomBarCompleting from './BottomBarCompleting'
import { ModalProvider } from '../../../providers/ModalProvider';

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
  it('triggers "cancel" and "complete" function after clicks', () => {
    const { getByTestId } = render(
    <ModalProvider>
      <BottomBarCompleting isLoading={false} />
    </ModalProvider>)
  })
})
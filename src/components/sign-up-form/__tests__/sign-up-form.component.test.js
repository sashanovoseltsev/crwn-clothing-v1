import { screen, fireEvent } from '@testing-library/react';

import { useDispatch } from 'react-redux';

import { USER_ACTION_TYPES } from '../../../store/user/user.types';
import { renderWithProviders } from '../../../utils/test/test.utils';
import SignUp from '../sign-up-form.component';

import { signUpWithEmailAndPasswordStart } from '../../../store/user/user.action';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn()
}))

describe('SignUp component tests', () => {
  test('It should render correctly ', () => {
    renderWithProviders(<SignUp />);

    expect(screen.getByLabelText(/display name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();

    const signUpBtnElem = screen.getByRole('button', { name: /^sign up$/i});
    expect(signUpBtnElem).toBeInTheDocument();
  })

  test('It should dispatch signUpWithEmailAndPasswordStart action when sign up is hit and all inputs are set', () => {
    renderWithProviders(<SignUp />);

    const mockUseDispatch = useDispatch;
    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);

    const signUpBtnElem = screen.getByRole('button', { name: /^sign up$/i});

    const displayNameInput = screen.getByLabelText(/display name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    fireEvent.change(displayNameInput, {target: { value: 'user'}});
    fireEvent.change(emailInput, {target: { value: 'user@email.com'}});
    fireEvent.change(passwordInput, {target: { value: 'pswd'}});
    fireEvent.change(confirmPasswordInput, {target: { value: 'pswd'}});

    expect(displayNameInput).toHaveValue('user');
    expect(emailInput).toHaveValue('user@email.com');
    expect(passwordInput).toHaveValue('pswd');
    expect(confirmPasswordInput).toHaveValue('pswd');

    fireEvent.click(signUpBtnElem);

    expect(mockDispatch).toHaveBeenCalledWith(signUpWithEmailAndPasswordStart('user@email.com', 'pswd', 'user'));

    expect(displayNameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
    expect(confirmPasswordInput).toHaveValue('');
  })

  test('It should not dispatch signUpWithEmailAndPasswordStart action when passwords are not correct', () => {
    renderWithProviders(<SignUp />);

    const mockUseDispatch = useDispatch;
    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);

    const signUpBtnElem = screen.getByRole('button', { name: /^sign up$/i});

    const displayNameInput = screen.getByLabelText(/display name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    fireEvent.change(displayNameInput, {target: { value: 'user'}});
    fireEvent.change(emailInput, {target: { value: 'user@email.com'}});
    fireEvent.change(passwordInput, {target: { value: 'pswd'}});
    fireEvent.change(confirmPasswordInput, {target: { value: 'pswd_incorrect'}});

    expect(displayNameInput).toHaveValue('user');
    expect(emailInput).toHaveValue('user@email.com');
    expect(passwordInput).toHaveValue('pswd');
    expect(confirmPasswordInput).toHaveValue('pswd_incorrect');

    fireEvent.click(signUpBtnElem);

    expect(mockDispatch).toHaveBeenCalledTimes(0);

    expect(displayNameInput).toHaveValue('user');
    expect(emailInput).toHaveValue('user@email.com');
    expect(passwordInput).toHaveValue('pswd');
    expect(confirmPasswordInput).toHaveValue('pswd_incorrect');
  })
})


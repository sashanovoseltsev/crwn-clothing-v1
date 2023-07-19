import { screen, fireEvent } from '@testing-library/react';

import { useDispatch } from 'react-redux';

import SignIn from '../sign-in-form.component';
import { renderWithProviders } from '../../../utils/test/test.utils';
import { USER_ACTION_TYPES } from '../../../store/user/user.types';
import { emailSignInStart, googleSignInStart } from '../../../store/user/user.action';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn()
}));

describe('SignIn component tests', () => {
  test('It should render correctly', () => {
    renderWithProviders(<SignIn />);

    expect(screen.getByRole('button', { name: /^sign in$/i})).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^google sign in$/i})).toBeInTheDocument();

    expect(screen.getByText(/email/i, { selector: 'label' })).toBeInTheDocument();
    expect(screen.getByText(/password/i, { selector: 'label' })).toBeInTheDocument();

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  })

  test('It should dispatch emailSignInAction when sign in button is clicked and reset email and pswd inputs', () => {
    renderWithProviders(<SignIn />, {
      preloadedState: {
        user: {
          currentUser: {},
          isLoading: false
        }
      }
    });

    // const mockUseDispatch = useDispatch;
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch); 

    const signInBtnElem = screen.getByRole('button', { name: /^sign in$/i})
    expect(signInBtnElem).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /^google sign in$/i})).toBeInTheDocument();

    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
    
    const pswdInput = screen.getByLabelText(/password/i);
    expect(pswdInput).toBeInTheDocument();

    fireEvent.change(emailInput, {target: { value: 'some@email.com'}});
    fireEvent.change(pswdInput, {target: { value: 'pswd'}});

    expect(emailInput).toHaveValue('some@email.com');
    expect(pswdInput).toHaveValue('pswd');
    
    fireEvent.click(signInBtnElem);

    expect(mockDispatch).toHaveBeenCalledWith(emailSignInStart('some@email.com', 'pswd'));
    
    expect(emailInput).toHaveValue('');
    expect(pswdInput).toHaveValue('');

    useDispatch.mockClear();
  })

  test('It should dispatch googleSignInStart when google sign in button is clicked and reset email and pswd inputs', () => {
    renderWithProviders(<SignIn />, {
      preloadedState: {
        user: {
          currentUser: {},
          isLoading: false
        }
      }
    });

    const mockUseDispatch = useDispatch;
    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);

    const googleSignInBtnElem = screen.getByRole('button', { name: /^google sign in$/i});

    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
    
    const pswdInput = screen.getByLabelText(/password/i);
    expect(pswdInput).toBeInTheDocument();

    fireEvent.change(emailInput, {target: { value: 'some@email.com'}});
    fireEvent.change(pswdInput, {target: { value: 'pswd'}});

    expect(emailInput).toHaveValue('some@email.com');
    expect(pswdInput).toHaveValue('pswd');
    
    fireEvent.click(googleSignInBtnElem);

    expect(mockDispatch).toHaveBeenCalledWith(googleSignInStart());

    expect(emailInput).toHaveValue('');
    expect(pswdInput).toHaveValue('');

    useDispatch.mockClear();
  })
})
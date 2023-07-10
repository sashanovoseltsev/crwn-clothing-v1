import { screen, fireEvent } from '@testing-library/react';

import { useDispatch } from 'react-redux';

import SignIn from '../sign-in-form.component';
import { renderWithProviders } from '../../../utils/test/test.utils';
import { USER_ACTION_TYPES } from '../../../store/user/user.types';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn()
}));

describe('SignIn component tests', () => {
  test('It should render correctly', () => {
    renderWithProviders(<SignIn />);

    const btnElems = screen.getAllByRole('button');
    const signInBtnElem = btnElems.filter(btn => btn.innerHTML.toLowerCase() === "sign in")[0];
    expect(signInBtnElem).toBeInTheDocument();

    const googleSignInBtnElem = btnElems.filter(btn => btn.innerHTML.toLowerCase() === "google sign in")[0];
    expect(googleSignInBtnElem).toBeInTheDocument();

    const emailLabelElem = screen.getByText(/email/i, { selector: 'label' });
    expect(emailLabelElem).toBeInTheDocument();
    
    const pswdLabelElem = screen.getByText(/password/i, { selector: 'label' });
    expect(pswdLabelElem).toBeInTheDocument();

    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
    
    const pswdInput = screen.getByLabelText(/password/i);
    expect(pswdInput).toBeInTheDocument();
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

    const btnElems = screen.getAllByRole('button');
    const signInBtnElem = btnElems.filter(btn => btn.innerHTML.toLowerCase() === "sign in")[0];
    expect(signInBtnElem).toBeInTheDocument();

    const googleSignInBtnElem = btnElems.filter(btn => btn.innerHTML.toLowerCase() === "google sign in")[0];
    expect(googleSignInBtnElem).toBeInTheDocument();

    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
    
    const pswdInput = screen.getByLabelText(/password/i);
    expect(pswdInput).toBeInTheDocument();

    fireEvent.change(emailInput, {target: { value: 'some@email.com'}});
    fireEvent.change(pswdInput, {target: { value: 'pswd'}});

    expect(emailInput).toHaveValue('some@email.com');
    expect(pswdInput).toHaveValue('pswd');
    
    fireEvent.click(signInBtnElem);

    expect(mockDispatch).toHaveBeenCalledWith({type: USER_ACTION_TYPES.EMAIL_SIGN_IN_START, payload: { email: 'some@email.com', password: 'pswd'}});

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

    const btnElems = screen.getAllByRole('button');
    const signInBtnElem = btnElems.filter(btn => btn.innerHTML.toLowerCase() === "sign in")[0];
    expect(signInBtnElem).toBeInTheDocument();

    const googleSignInBtnElem = btnElems.filter(btn => btn.innerHTML.toLowerCase() === "google sign in")[0];
    expect(googleSignInBtnElem).toBeInTheDocument();

    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
    
    const pswdInput = screen.getByLabelText(/password/i);
    expect(pswdInput).toBeInTheDocument();

    fireEvent.change(emailInput, {target: { value: 'some@email.com'}});
    fireEvent.change(pswdInput, {target: { value: 'pswd'}});

    expect(emailInput).toHaveValue('some@email.com');
    expect(pswdInput).toHaveValue('pswd');
    
    fireEvent.click(googleSignInBtnElem);

    expect(mockDispatch).toHaveBeenCalledWith({ type: USER_ACTION_TYPES.GOOGLE_SIGN_IN_START });

    expect(emailInput).toHaveValue('');
    expect(pswdInput).toHaveValue('');

    useDispatch.mockClear();
  })
})
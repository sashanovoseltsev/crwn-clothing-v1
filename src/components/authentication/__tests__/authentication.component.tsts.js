import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/test/test.utils';
import Authentication from '../authentication.component';

describe('Authentication component tests', () => {
  test('It renders Spinner in case user is loading', () => {
    const preloadedState = {
      user: {
        currentUser: null,
        isLoading: true,
        error: null
      }
    };

    renderWithProviders(<Authentication />, { preloadedState });

    const spinnerComponent = screen.getByTestId('spinner');
    expect(spinnerComponent).toBeInTheDocument();
  })

  test('It renders sign-in and sign-up components if user is NOT loading', () => {
    const preloadedState = {
      user: {
        currentUser: null,
        isLoading: false,
        error: null
      }
    };

    renderWithProviders(<Authentication />, { preloadedState });

    const signInElems = screen.getAllByText(/sign in/i);
    const signUpElems = screen.getAllByText(/sign up/i);

    const signInButton = signInElems.filter(elem => elem.innerHTML.toLowerCase() === 'sign in').at(0);
    expect(signInButton).toBeInTheDocument();
    const signUpButton = signUpElems.filter(elem => elem.innerHTML.toLowerCase() === 'sign up').at(0);
    expect(signUpButton).toBeInTheDocument();
  })
})
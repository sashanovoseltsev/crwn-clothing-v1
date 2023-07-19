import { screen, fireEvent } from '@testing-library/react';

import Navigation from '../navigation.component';
import { renderWithProviders } from '../../../utils/test/test.utils';
import * as firebaseUtils from '../../../utils/firebase/firebase.utils';

describe('Navigation tests', () => {

  test('It should render Shop link', () => {
    renderWithProviders(<Navigation />);
    const signInLink = screen.getByRole('link', { name: /shop/i});
    expect(signInLink).toBeInTheDocument();
  })

  test('It should render Sign In button if no user is provided', () => {
    const preloadedState = {
      user: {
        currentUser: null
      }
    };

    renderWithProviders(<Navigation />, { preloadedState });
    const signInLink = screen.getByRole('link', { name: /sign in/i});
    expect(signInLink).toBeInTheDocument();

    const signOutLinkElement = screen.queryByText(/sign out/i);
    expect(signOutLinkElement).toBeNull();
  })

  test('It should render Sign Out and not Sign In link if user is provided', () => {
    const preloadedState = {
      user: {
        currentUser: {}
      }
    };

    renderWithProviders(<Navigation />, { preloadedState });
    const signOutLink = screen.getByRole('button', { name: /sign out/i });
    expect(signOutLink).toBeInTheDocument();

    const signInLink = screen.queryByRole('button', { name: /sign in/i  });
    expect(signInLink).toBeNull();
  })

  test('It should render visible empty cart dropdown if cart is opened', () => {
    const preloadedState = {
      cart: {
        isOpened: true,
        items: new Map()
      }
    };

    renderWithProviders(<Navigation />, { preloadedState });
    const goToCheckOutBtnElement = screen.getByRole('button', { name: /go to checkout/i });
    expect(goToCheckOutBtnElement).toBeVisible();
    expect(goToCheckOutBtnElement).toBeInTheDocument();

    const cartIsEmptyLblElement = screen.getByText(/cart is empty/i);
    expect(cartIsEmptyLblElement).toBeInTheDocument();
    expect(cartIsEmptyLblElement).toBeVisible();

    const cartDropDownContainer = cartIsEmptyLblElement.parentElement;
    expect(cartDropDownContainer).toBeVisible();
  })

  test('It should render invisible cart dropdown if cart is closed', () => {
    const preloadedState = {
      cart: {
        isOpened: false,
        items: new Map()
      }
    };

    renderWithProviders(<Navigation />, { preloadedState });

    const goToCheckOutBtnElement = screen.getByText(/go to checkout/i);
    expect(goToCheckOutBtnElement).toBeInTheDocument();
    expect(goToCheckOutBtnElement).toHaveStyle('visibility: hidden');

    const cartIsEmptyLblElement = screen.getByText(/cart is empty/i);
    expect(cartIsEmptyLblElement).toBeInTheDocument();
    expect(cartIsEmptyLblElement).toHaveStyle('visibility: hidden');

    const cartDropDownContainer = cartIsEmptyLblElement.parentElement;
    expect(cartDropDownContainer).toHaveStyle('visibility: hidden');
    expect(cartDropDownContainer).toHaveStyle('opacity: 0');
  })

  test('It should dispatch signOutStart action when clicking on the Sign Out link', async () => {
    const { store } = renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: {},
        }
      }
    });

    var state = store.getState();
    expect(state.user.currentUser).toEqual({});
    const signOutLinkElement = screen.getByRole('button', { name: /sign out/i });
    expect(signOutLinkElement).toBeInTheDocument();
    
    await fireEvent.click(signOutLinkElement);
    state = store.getState();
    expect(state.user.currentUser).toBeNull();
  });
})
import { screen, fireEvent } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/test/test.utils';

import * as reactRouterDom from "react-router-dom";

import CartDropdown from '../cart-dropdown.component';

import { generateTestCartItem } from '../../../utils/test/test.utils';

jest.mock('react-router-dom', () => ({
    __esModule: true, // - this is do REQUIRED for jest.spyOn. Not required when you mock useNavigate directly here.
                      // con for mocking useNavigate here is that there is no easy way to restore original implementation for other tests.
    ...jest.requireActual('react-router-dom'),
    //useNavigate: jest.fn(), 
  }));

describe('CartDropdown Component tests', () => {

  test('It should render all cart items from cart with correct quantity and price and total price', () => {
    const initialCartItems = new Map();
    const item1 = generateTestCartItem('1');
    const item2 = generateTestCartItem('2', 3, 15);
    initialCartItems.set('1', item1);
    initialCartItems.set('2', item2);

    renderWithProviders(<CartDropdown isOpened={true} />, {
      preloadedState: {
        cart: {
          items: initialCartItems
        }
      }
    });

    expect(screen.getByText(new RegExp(item1.name, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(item2.name, 'i'))).toBeInTheDocument();

    expect(screen.getByText(new RegExp(`${item1.qnt} x ${item1.price}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${item2.qnt} x ${item2.price}`, 'i'))).toBeInTheDocument();

    const totalPriceRegExp = new RegExp(`total price: ${item1.qnt * item1.price + item2.qnt * item2.price}`, 'i');
    const totalPriceElem = screen.getByText(totalPriceRegExp);
    expect(totalPriceElem).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /go to checkout/i })).toBeInTheDocument();
  })

  test('It should render Cart is Empty message if cart is empty', () => { 
    renderWithProviders(<CartDropdown isOpened={true} />, {
      preloadedState: {
        cart: {
          items: new Map()
        }
      }
    });

    expect(screen.getByText(/cart is empty/i)).toBeInTheDocument();
  })

  test('It should navigate to /checkout when Go to Checkout btn is clicked', () => {

    const mockNavigate = jest.fn();

    // For this to work we must jest.mock entire 'react-router-dom' module (which is done before describe).
    // This is required because useNavigate is exported by name (named export) and that's why we receive Error: 'Cannot redefine property: function...'
    const mockUseNavigate = jest.spyOn(reactRouterDom, 'useNavigate');
    mockUseNavigate.mockReturnValue(mockNavigate);

    renderWithProviders(<CartDropdown isOpened={true} />, {
      preloadedState: {
        cart: {
          items: new Map()
        }
      }
    });

    const goToCheckoutBtnElem = screen.getByRole('button', { name: /go to checkout/i });
    expect(goToCheckoutBtnElem).toBeInTheDocument();

    fireEvent.click(goToCheckoutBtnElem);

    expect(mockNavigate).toHaveBeenCalledWith('/checkout');
    expect(mockNavigate).toHaveBeenCalledTimes(1);

    jest.restoreAllMocks();
  })

  test('It should close the cart (dispatch toggleCartOpened()) in case location is changed', () => {
    const { store } = renderWithProviders(<CartDropdown isOpened={true} />, {
      preloadedState: {
        cart: {
          items: new Map(),
          isOpened: true
        }
      }
    });

    expect(store.getState().cart.isOpened).toBe(true);

    const goToCheckoutBtnElem = screen.getByRole('button', { name: /go to checkout/i });
    expect(goToCheckoutBtnElem).toBeInTheDocument();

    fireEvent.click(goToCheckoutBtnElem);

    expect(store.getState().cart.isOpened).toBe(false);
  })
});
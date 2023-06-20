import { screen, fireEvent } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/test/test.utils';

import * as reactRouterDom from "react-router-dom";

import CartDropdown from '../cart-dropdown.component';

jest.mock('react-router-dom', () => ({
    __esModule: true, // - this is do REQUIRED for jest.spyOn. Not required when you mock useNavigate directly here.
                      // con for mocking useNavigate here is that there is no easy way to restore original implementation for other tests.
    ...jest.requireActual('react-router-dom'),
    //useNavigate: jest.fn(), 
  }));

describe('CartDropdown Component tests', () => {

  test('It should render all cart items from cart with correct quantity and price and total price', () => {
    const initialCartItems = new Map();
    initialCartItems.set(1, { id: 1, name: 'Item A', imageUrl: 'test', price: 10, qnt: 1 });
    initialCartItems.set(2, { id: 2, name: 'Item B', imageUrl: 'test', price: 15, qnt: 3 });

    renderWithProviders(<CartDropdown isOpened={true} />, {
      preloadedState: {
        cart: {
          items: initialCartItems
        }
      }
    });

    const cartItemA = screen.getByText(/item a/i).parentElement;
    const itemAPriceQntText = [...cartItemA.children].filter(elem => elem.innerHTML === '1 x 10$').at(0);
    expect(itemAPriceQntText).toBeInTheDocument();

    const cartItemB = screen.getByText(/item b/i).parentElement;
    const itemBPriceQntText = [...cartItemB.children].filter(elem => elem.innerHTML === '3 x 15$').at(0);
    expect(itemBPriceQntText).toBeInTheDocument();

    const totalPriceElem = screen.getByText(/Total price: 55/i);
    expect(totalPriceElem).toBeInTheDocument();

    const goToCheckoutBtnElem = screen.getByText(/go to checkout/i);
    expect(goToCheckoutBtnElem).toBeInTheDocument();
  })

  test('It should render Cart is Empty message if cart is empty', () => {
    const initialCartItems = new Map();

    renderWithProviders(<CartDropdown isOpened={true} />, {
      preloadedState: {
        cart: {
          items: initialCartItems
        }
      }
    });

    const cartIsEmptyMsgElem = screen.getByText(/cart is empty/i);
    expect(cartIsEmptyMsgElem).toBeInTheDocument();
  })

  test('It should navigate to /checkout when Go to Checkout btn is clicked', () => {

    const mockNavigate = jest.fn();

    // For this to work we must jest.mock entire 'react-router-dom' module (which is done before describe).
    // This is required because useNavigate is exported by name (named export) and that's why we receive Error: 'Cannot redefine property: function...'
    const mockUseNavigate = jest.spyOn(reactRouterDom, 'useNavigate');
    mockUseNavigate.mockReturnValue(mockNavigate);

    const initialCartItems = new Map();

    renderWithProviders(<CartDropdown isOpened={true} />, {
      preloadedState: {
        cart: {
          items: initialCartItems
        }
      }
    });

    const goToCheckoutBtnElem = screen.getByText(/go to checkout/i);
    expect(goToCheckoutBtnElem).toBeInTheDocument();

    fireEvent.click(goToCheckoutBtnElem);

    expect(mockNavigate).toHaveBeenCalledWith('/checkout');
    expect(mockNavigate).toHaveBeenCalledTimes(1);

    jest.restoreAllMocks();
  })

  test('It should close the cart (dispatch toggleCartOpened()) in case location is changed', () => {
    const initialCartItems = new Map();

    const { store } = renderWithProviders(<CartDropdown isOpened={true} />, {
      preloadedState: {
        cart: {
          items: initialCartItems,
          isOpened: true
        }
      }
    });

    expect(store.getState().cart.isOpened).toBe(true);

    const goToCheckoutBtnElem = screen.getByText(/go to checkout/i);
    expect(goToCheckoutBtnElem).toBeInTheDocument();

    fireEvent.click(goToCheckoutBtnElem);

    expect(store.getState().cart.isOpened).toBe(false);
  })
});
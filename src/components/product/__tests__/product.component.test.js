import { screen, fireEvent } from '@testing-library/react';
import { act } from '@testing-library/react';
import { renderWithProviders } from '../../../utils/test/test.utils';
import Product from '../product.component';

import { selectTotalItems } from '../../../store/cart/cart.selectors';
import { addItemToCart } from '../../../store/cart/cart.action';

describe('Product Card tests',  () => {
  test('It should add the product item when Product Add is clicked', async () => {
    const mockProduct = {
      id: 1,
      imageUrl: "test",
      name: "item A",
      price: 10
    }

    const cartItems = new Map();
    cartItems.set(2, { id: 2, name: "item B", price: 20, imageUrl: "test B", qnt: 1});

    const preloadedState = {
      cart: {
        items: cartItems,
        isOpened: false
      }
    }

    const { store } = renderWithProviders(<Product product={mockProduct} />, { preloadedState });

    const addToCartButtonElement = screen.getByText(/add to cart/i);
    await fireEvent.click(addToCartButtonElement);
    const state = store.getState();
    expect(state.cart.items.size).toBe(2);
  })

  test('It should increase quantity of existing product when Product Add is clicked', async () => {
    const mockProduct = {
      id: "1",
      imageUrl: "test",
      name: "item A",
      price: 10
    }

    const cartItems = new Map();

    const preloadedState = {
      cart: {
        items: cartItems,
        isOpened: false
      }
    }

    const { store } = renderWithProviders(<Product product={mockProduct} />, { preloadedState });
    act(() => {
      store.dispatch(addItemToCart(cartItems, mockProduct));
      store.dispatch(addItemToCart(cartItems, mockProduct));
    });

    const addToCartButtonElement = screen.getByText(/add to cart/i);
    await fireEvent.click(addToCartButtonElement);
    const state = store.getState();
    expect(state.cart.items.size).toBe(1);
    expect(state.cart.items.get(mockProduct.id).qnt).toBe(3);
    // or
    const totalItems = selectTotalItems(state);
    expect(totalItems).toBe(3);
  })

})
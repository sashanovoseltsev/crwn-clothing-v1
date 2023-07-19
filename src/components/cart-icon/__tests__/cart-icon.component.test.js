import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/test/test.utils';
import CartIcon from '../cart-icon.component';

import { generateTestCartItem } from '../../../utils/test/test.utils';

describe('Cart Icon tests', () => {
  test('Uses preloaded state to render', () => {
    const initialCartItems = new Map();
    initialCartItems.set(1, generateTestCartItem('1', 1));
    initialCartItems.set(2, generateTestCartItem('1', 3));

    renderWithProviders(<CartIcon />, {
      preloadedState: {
        cart: {
          items: initialCartItems
        }
      }
    });

    const cartIconElement = screen.getByText('4');
    expect(cartIconElement).toBeInTheDocument();
  })
});
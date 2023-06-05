import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/test/test.utils';
import CartIcon from '../cart-icon.component';

describe('Cart Icon tests', () => {
  test('Uses preloaded state to render', () => {
    const initialCartItems = new Map();
    initialCartItems.set(1, { id: 1, name: 'Item A', imageUrl: 'test', price: 10, qnt: 1 });
    initialCartItems.set(2, { id: 2, name: 'Item B', imageUrl: 'test', price: 10, qnt: 3 });

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
import { screen } from '@testing-library/react';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '../../../utils/stripe/stripe.utils';

import { renderWithProviders } from '../../../utils/test/test.utils';

import Checkout from '../checkout.component';

import { generateTestCategoryItem } from '../../../utils/test/test.utils';

describe('Checkout component tests', () => {
  test('It should render all items from cart with total price', () => {
    const items = new Map();
    items.set("1", generateTestCategoryItem("1"));
    items.set("2", generateTestCategoryItem("2"));
    items.set("3", generateTestCategoryItem("3"));

    const preloadedState = {
      cart: {
        items
      }
    }

    renderWithProviders(<Elements stripe={stripePromise}><Checkout /></Elements>, { preloadedState });

    expect([...screen.getAllByRole('img')].length).toBe(3);

    const actualPrice = parseInt(screen.getByText(/total/i).innerHTML.split(':')[1].replace('$', ''));    
    const expectedTotalPrice = [...items.values()].reduce((acc, item) => acc + item.qnt * item.price, 0);

    expect(actualPrice).toBe(expectedTotalPrice);
  })

  test('It should render payment form', () => {
    renderWithProviders(<Elements stripe={stripePromise}><Checkout /></Elements>);

    expect(screen.getByText(/credit/i)).toBeInTheDocument();
    expect(screen.getByRole('form', { name: 'stripe-payment-form' })).toBeInTheDocument();
    expect(screen.getByRole('button', { value: { text: /pay now/i } })).toBeInTheDocument();
  })
})
import { screen, render } from '@testing-library/react';

import CartItem from '../cart-item.component';

describe('CartItem tests', () => {
  test('It should render correctly based on provided CartItemType instance', () => {

    const item = {
      id: '1',
      name: 'Item A',
      price: 10,
      imageUrl: 'http://somehost.com/url1',
      qnt: 2
    }
    const { container } = render(<CartItem item={item} />);

    const nameSpanElem = screen.getByText(/Item A/i);
    expect(nameSpanElem).toBeInTheDocument();

    const priceSpanElem = screen.getByText('2 x 10$');
    expect(priceSpanElem).toBeInTheDocument();

    const imgElem = container.querySelector('img');
    expect(imgElem.src).toBe(item.imageUrl);
    expect(imgElem.alt).toBe(item.name);
  })
})

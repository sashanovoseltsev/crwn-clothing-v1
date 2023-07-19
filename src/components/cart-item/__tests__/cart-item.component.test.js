import { screen, render } from '@testing-library/react';

import CartItem from '../cart-item.component';

import { generateTestCartItem } from '../../../utils/test/test.utils';

describe('CartItem tests', () => {
  test('It should render correctly based on provided CartItemType instance', () => {

    const item = generateTestCartItem('1', 2);

    const { container } = render(<CartItem item={item} />);

    const nameSpanElem = screen.getByText(new RegExp(item.name, 'i'));
    expect(nameSpanElem).toBeInTheDocument();

    const priceSpanElem = screen.getByText(new RegExp(`${item.qnt} x ${item.price}`, 'i'));
    expect(priceSpanElem).toBeInTheDocument();


    const imgElem = screen.getByRole('img');
    expect(imgElem.src).toBe(item.imageUrl);
    expect(imgElem.alt).toBe(item.name);
  })
})

import { screen, render, fireEvent } from '@testing-library/react';

import CheckoutItem from '../checkout-item.component';

import { generateTestCartItem } from '../../../utils/test/test.utils';

describe('CheckoutItem tests', () => {

  var item;

  beforeAll(() => {
    item = generateTestCartItem('1');
  })

  test('It should render correctly with cart item provided', () => {      
    render(<CheckoutItem item={item} changeQuantity={() => {}} removeItem={() => {}} />);
    
    const imgElem = screen.getByRole('img');
    expect(imgElem).toBeInTheDocument();
    expect(imgElem).toHaveAttribute('src', item.imageUrl);
    expect(imgElem).toHaveAttribute('alt', item.name);

    const descrElem = screen.getByText(item.name);
    expect(descrElem).toBeInTheDocument();

    const qntElem = screen.getByText(item.qnt);
    expect(qntElem).toBeInTheDocument();

    const priceElem = screen.getByText(item.price + '$');
    expect(priceElem).toBeInTheDocument();
  })

  test('It should correctly handle all btn clicks', () => {  
    const mockChangeQnt = jest.fn();
    const mockRemoveItem = jest.fn();
    render(<CheckoutItem item={item} changeQuantity={mockChangeQnt} removeItem={mockRemoveItem} />);

    const removeBtn = screen.getByText('×');
    expect(removeBtn).toBeInTheDocument();
    fireEvent.click(removeBtn);
    expect(mockRemoveItem).toBeCalledWith(item);

    const decreaseQntBtn = screen.getByText('‹');
    expect(decreaseQntBtn).toBeInTheDocument();
    fireEvent.click(decreaseQntBtn);
    expect(mockChangeQnt).toBeCalledWith(item, -1);

    const increaseQntBtn = screen.getByText('›');
    expect(increaseQntBtn).toBeInTheDocument();
    fireEvent.click(increaseQntBtn);
    expect(mockChangeQnt).toBeCalledWith(item, 1);
  })
})
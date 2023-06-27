import { screen, render, fireEvent } from '@testing-library/react';

import CheckoutItem from '../checkout-item.component';

describe('CheckoutItem tests', () => {
  test('It should render correctly with cart item provided', () => {

    const item = {
        id: '1',
        name: 'Item 1',
        price: 10,
        imageUrl: 'http://testhost.com/url1',
        qnt: 1
      };
      
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
    const item = {
      id: '1',
      name: 'Item 1',
      price: 10,
      imageUrl: 'http://testhost.com/url1',
      qnt: 1
    };
  
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
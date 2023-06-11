import { selectCartItems,
  selectCartIsOpened,
  selectTotalItems,
  selectTotalPrice } from '../cart.selectors';

const mockedItems = new Map();
mockedItems.set('1', {
  id: '1',
  name: 'test p1',
  price: 10,
  qnt: 1,
  imageUrl: 'testurl.com'
});
mockedItems.set('2', {
  id: '2',
  name: 'test p2',
  price: 20,
  qnt: 2,
  imageUrl: 'testurl2.com'
});

const mockedState = {
  cart: {
    isOpened: false,
    items: mockedItems
  }
};

describe('cart selectors tests', () => {
  test('selectCartItems', () => {
    expect(selectCartItems(mockedState)).toEqual(mockedItems);
  });

  test('selectCartIsOpened', () => {
    expect(selectCartIsOpened(mockedState)).toBe(mockedState.cart.isOpened);
  });

  test('selectTotalItems', () => {
    expect(selectTotalItems(mockedState)).toBe(3);
  });

  test('selectTotalPrice', () => {
    expect(selectTotalPrice(mockedState)).toBe(10 + 20*2);
  })
});
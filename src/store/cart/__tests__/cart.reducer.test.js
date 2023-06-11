import { CART_INITIAL_VALUE, cartReducer } from '../cart.reducer';

import { toggleCartOpened, setCartItems } from "../cart.action";

describe('cart reducer tests', () => {
  test('toggleCartOpened', () => {
    const expectedState = {
      ...CART_INITIAL_VALUE,
      isOpened: true
    };

    expect(cartReducer(CART_INITIAL_VALUE, toggleCartOpened())).toEqual(expectedState);
  });

  test('setCartItems', () => {

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

    const expectedState = {
      ...CART_INITIAL_VALUE,
      items: mockedItems
    };

    expect(cartReducer(CART_INITIAL_VALUE, setCartItems(mockedItems))).toEqual(expectedState);
  });
})
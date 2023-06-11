import { setCartItems,
  addItemToCart,
  removeItemFromCart,
  changeItemQuantity
} from '../cart.action';

describe('cart action tests', () => {
  let mockedItems;
  
  beforeEach(() => {
    mockedItems = new Map();
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
  })

  test('setCartItems', () => {
    expect(setCartItems(mockedItems).payload).toEqual(mockedItems);
  })

  test('addItemToCart add new item', () => {
    const newItem = {
      id: '3',
      name: 'test p3',
      price: 20,
      imageUrl: 'testurl3.com'
    }

    expect(addItemToCart(mockedItems, newItem).payload.size).toBe(3);
  })

  test('addItemToCart add existing item', () => {
    const item = {
      id: '2',
      name: 'test p2',
      price: 20,
      imageUrl: 'testurl3.com'
    }

    expect(addItemToCart(mockedItems, item).payload.get(item.id).qnt).toBe(3);
  })

  test('removeItemFromCart', () => {
    const item = {
      id: '2',
      name: 'test p2',
      price: 20,
      imageUrl: 'testurl3.com'
    }

    expect(removeItemFromCart(mockedItems, item).payload.size).toBe(1);
  })

  test('changeItemQuantity', () => {
    const item = mockedItems.get('2');

    expect(changeItemQuantity(mockedItems, item, -1).payload.get(item.id).qnt).toBe(1);
  })

  test('changeItemQuantity will decrease less than 1', () => {
    const item = mockedItems.get('1');

    expect(changeItemQuantity(mockedItems, item, -1).payload.get(item.id).qnt).toBe(1);
  })
})
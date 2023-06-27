import { screen, fireEvent } from '@testing-library/react';

import * as reactRouterDom from 'react-router-dom';

import { renderWithProviders } from '../../../utils/test/test.utils';
import CategoryPreview from '../category-preview.component';

// prepare jest.spyOn
jest.mock('react-router-dom', () => (
  {
    __esModule: true, 
    ...jest.requireActual('react-router-dom')
  }));

describe('CategoryPreview tests', () => {
  test('it should render correctly with title and products provided', () => {
    const title = 'Category 1';
    const items = generateTestCategoryItems();
    const preloadedState = {
      cart: {
        items: new Map(),
        isOpened: false
      }
    };

    renderWithProviders(<CategoryPreview title={title} products={items}/>, { preloadedState });

    const btnElem = screen.getByRole('button');
    expect(btnElem).toBeInTheDocument();
    expect(btnElem.innerHTML.toLocaleLowerCase()).toEqual(title.toLocaleLowerCase());

    const item1Elem = screen.getByText(/item 1/i);
    expect(item1Elem).toBeInTheDocument();

    const item2Elem = screen.getByText(/item 2/i);
    expect(item2Elem).toBeInTheDocument();
  })

  test('it should navigate to correct route when category title btn is clicked', () => {
    const title = 'Category 1';
    const items = generateTestCategoryItems();
    const preloadedState = {
      cart: {
        items: new Map(),
        isOpened: false
      }
    };

    const mockNavigate = jest.fn();
    const mockUseNavigate = jest.spyOn(reactRouterDom, 'useNavigate');
    mockUseNavigate.mockReturnValue(mockNavigate);

    renderWithProviders(<CategoryPreview title={title} products={items}/>, { preloadedState });

    const btnElem = screen.getByRole('button');
    fireEvent.click(btnElem);

    expect(mockNavigate).toBeCalledWith(`/shop/${title}`);

    jest.restoreAllMocks();
  })
})


function generateTestCategoryItems() {
  const items = [
    {
      id: '1',
      name: 'Item 1',
      price: 10,
      imageUrl: 'http://testhost.com/url1'
    },
    {
      id: '2',
      name: 'Item 2',
      price: 20,
      imageUrl: 'http://testhost.com/url2'
    }
  ];

  return items;
}
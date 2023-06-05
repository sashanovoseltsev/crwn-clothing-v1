import { screen } from '@testing-library/react';

import Category from '../category.component';
import { renderWithProviders } from '../../../utils/test/test.utils';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    category: 'mens',
  }),
  })
);

describe('Category tests', () => {
  test('It should render spinner if isLoading equals true', () => {
    renderWithProviders(<Category />, {
      preloadedState: {
        categories: {
          isLoading: true,
          categoriesArray: []
        }
      }
    });

    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toBeInTheDocument();
  });

  test('It should render no spinner if isLoading equals false', () => {
    renderWithProviders(<Category />, {
      preloadedState: {
        categories: {
          isLoading: false,
          categoriesArray: []
        }
      }
    });

    const spinnerElement = screen.queryByTestId('spinner');
    expect(spinnerElement).toBeNull();
  });

  test('It should render category items', () => {
    renderWithProviders(<Category />, {
      preloadedState: {
        categories: {
          isLoading: false,
          categoriesArray: [
            {
              title: 'mens',
              items: [
                { id: 1, name: 'Product 1', price: 20, imageUrl: "url1" },
                { id: 2, name: 'Product 2', price: 40, imageUrl: "url2"}
              ],
            }
          ]
        }
      }
    });
    
    const p1Elem = screen.getByText('Product 1');
    expect(p1Elem).toBeInTheDocument();

    const p2Elem = screen.getByText('Product 2');
    expect(p2Elem).toBeInTheDocument();
  });
});
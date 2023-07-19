import { screen } from '@testing-library/react';

import Category from '../category.component';
import { renderWithProviders } from '../../../utils/test/test.utils';

import { generateTestCategory } from '../../../utils/test/test.utils';

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
    const category = generateTestCategory('mens')
    renderWithProviders(<Category />, {
      preloadedState: {
        categories: {
          isLoading: false,
          categoriesArray: [category]
        }
      }
    });
    
    const p1Elem = screen.getByText(new RegExp(category.items[0].name, 'i'));
    expect(p1Elem).toBeInTheDocument();

    const p2Elem = screen.getByText(new RegExp(category.items[1].name, 'i'));
    expect(p2Elem).toBeInTheDocument();
  });
});
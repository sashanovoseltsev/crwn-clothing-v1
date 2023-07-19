import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/test/test.utils';

import React from 'react';

import Home from '../home.component';

import { generateTestCategory } from '../../../utils/test/test.utils';

describe('Home component tests', () => {
  test('It should render all categories from categories.categoriesArray if isLoading eq. false', () => {
    const categories = [generateTestCategory('cat1'), generateTestCategory('cat2')];

    const preloadedState = {
      categories: {
        categoriesArray: categories,
        isLoading: false
      }
    };

    renderWithProviders(<Home />, { preloadedState });

    const shopNowLinks = screen.getAllByRole('link', { name: /shop now/i})
    expect([...shopNowLinks].length).toBe(categories.length);
  })

  test('It should render spinner if categories.isLoading eq. true', () => {
    const preloadedState = {
      categories: {
        categoriesArray: [],
        isLoading: true
      }
    };

    renderWithProviders(<Home />, { preloadedState });

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  })

  test('It should store categories in state during useEffect hook', () => {
    const categories = [generateTestCategory('cat1'), generateTestCategory('cat2')];

    const mockSetState = jest.fn();

    jest
      .spyOn(React, 'useState')
      .mockImplementation(initState => [initState, mockSetState]);

    const preloadedState = {
      categories: {
        categoriesArray: categories,
        isLoading: false
      }
    };

    renderWithProviders(<Home />, { preloadedState });

    expect(mockSetState).toHaveBeenCalledWith(categories);

    jest.clearAllMocks();
  })
})
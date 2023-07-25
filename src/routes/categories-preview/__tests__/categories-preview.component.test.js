import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/test/test.utils';

import CategoriesPreview from '../categories-preview.component';

import { generateTestCategory } from '../../../utils/test/test.utils';

describe('CategoriesPreview component test', () => {
  test('It should render category preview for each category if categories.isLoading state is false', () => {
    const preloadedState = {
      categories: {
        categoriesArray: [generateTestCategory('cat1'), generateTestCategory('cat2')],
        isLoading: false,
        error: null
      }
    }

    renderWithProviders(<CategoriesPreview />, { preloadedState });

    const catBtnElems = screen.getAllByRole('button', { name: /cat/i });
    expect([...catBtnElems].length).toBe(2);

    const productImgs = screen.getAllByRole('img');
    expect([...productImgs].length).toBe(4);
  })

  test('It should render Spinner if categories.isLoading state is true', () => {
    const preloadedState = {
      categories: {
        categoriesArray: [],
        isLoading: true,
        error: null
      }
    }

    renderWithProviders(<CategoriesPreview />, { preloadedState });

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  })
})
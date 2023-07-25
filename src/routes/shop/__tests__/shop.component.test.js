import { screen } from '@testing-library/react';

import Shop from '../shop.component';

import { renderWithProvidersAndRoute } from '../../../utils/test/test.utils';

import { generateTestCategory, generateTestCategoryItem } from '../../../utils/test/test.utils';

describe('Shop component tests', () => {
  test('It should render CategoriesPreview with all categories from state by default', () => {
    const categories = [generateTestCategory('cat1', [generateTestCategoryItem('1'), generateTestCategoryItem('2')]), 
    generateTestCategory('cat2', [generateTestCategoryItem('3'), generateTestCategoryItem('4')])];

    const preloadedState = {
      categories: {
        categoriesArray: categories,
        isLoading: false
      }
    };

    renderWithProvidersAndRoute(<Shop />, { preloadedState });

    const allItems = categories.reduce((acc, c) => acc.concat(c.items), []);

    allItems.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    })
  })

  test('It should render CategoriesPreview with only categories specified by route path.', () => {
    const categories = [generateTestCategory('cat1', [generateTestCategoryItem('1'), generateTestCategoryItem('2')]), 
    generateTestCategory('cat2', [generateTestCategoryItem('3'), generateTestCategoryItem('4')])];

    const preloadedState = {
      categories: {
        categoriesArray: categories,
        isLoading: false
      }
    };

    renderWithProvidersAndRoute(<Shop />, { route: '/cat1', preloadedState });

    categories[0].items.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    })

    categories[1].items.forEach((item) => {
      expect(screen.queryByText(item.name)).toBeNull();
    })
  })
})
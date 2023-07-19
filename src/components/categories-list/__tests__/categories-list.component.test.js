import { screen, render } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import CategoriesList from '../categories-list.component';

import { generateTestCategory } from '../../../utils/test/test.utils';

describe('CategoriesList component tests', () => {
  test('It should render properly with categories provided', () => {
    const testCategories = [generateTestCategory('cat1'), generateTestCategory('cat2')];

    render(<BrowserRouter><CategoriesList categories={testCategories} /></BrowserRouter>);

    const catItemElems = screen.getAllByText(/shop now/i);
    expect(catItemElems.length).toBe(2);
    catItemElems.forEach(element => {
      expect(element).toBeInTheDocument();
    });
  })
})
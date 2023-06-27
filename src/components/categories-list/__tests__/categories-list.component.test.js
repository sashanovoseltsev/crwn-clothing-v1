import { screen, render } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import CategoriesList from '../categories-list.component';

describe('CategoriesList component tests', () => {
  test('It should render properly with categories provided', () => {
    const testCategories = generateTestCategories();

    render(<BrowserRouter><CategoriesList categories={testCategories} /></BrowserRouter>);

    const catItemElems = screen.getAllByText(/shop now/i);
    expect(catItemElems.length).toBe(2);
    catItemElems.forEach(element => {
      expect(element).toBeInTheDocument();
    });
  })
})

function generateTestCategories() {
  const items1 = [
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

  const items2 = [
    {
      id: '11',
      name: 'Item 11',
      price: 11,
      imageUrl: 'http://testhost.com/url11'
    },
    {
      id: '22',
      name: 'Item 22',
      price: 22,
      imageUrl: 'http://testhost.com/url22'
    }
  ];

  const category1 = {
    id: 'cat1',
    title: 'cat1',
    route: 'shop/cat1',
    imageUrl: 'http://testhost.com/cat1',
    items: items1
  };

  const category2 = {
    id: 'cat2',
    title: 'cat2',
    route: 'shop/cat2',
    imageUrl: 'http://testhost.com/cat2',
    items: items2
  };

  return [category1, category2];
}
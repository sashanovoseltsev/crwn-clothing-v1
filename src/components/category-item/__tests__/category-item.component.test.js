import { screen, render, fireEvent } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import CategoryItem from '../category-item.component';

import { renderWithProviders, generateTestCategory } from '../../../utils/test/test.utils';

describe('CategoryItem test', () => {
  test('It should render correctly with category provided', () => {
    const category = generateTestCategory('cat1');

    const { container } = render(<BrowserRouter>
      <CategoryItem category={category}/>
    </BrowserRouter>);

    const children = [...container.firstChild.children];
    const imgElem = children.filter(el => !el.hasChildNodes())[0];
    expect(imgElem).toHaveStyle(`background-image: url(${category.imageUrl})`);

    const titleElem = screen.getByText(category.title);
    expect(titleElem).toBeInTheDocument();

    const shopNowElem = screen.getByRole('link', { name: /shop now/i});
    expect(shopNowElem).toBeInTheDocument();
  })

  test('it should have shop now link with correct href', () => {
    const category = generateTestCategory('cat1');

    renderWithProviders(<CategoryItem category={category}/>);

    const shopNowLink = screen.getByRole('link', { name: /shop now/i});

    expect(shopNowLink).toHaveAttribute('href', '/' + category.route);

    fireEvent.click(shopNowLink);
  })
})
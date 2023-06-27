import { screen, render, fireEvent } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import * as reactRouterDom from 'react-router-dom';
import CategoryItem from '../category-item.component';

jest.mock('react-router-dom', () => ({
  __esModule: true,
  ...jest.requireActual('react-router-dom')
}));

describe('CategoryItem test', () => {
  test('It should render correctly with category provided', () => {
    const category = generateTestCategory();

    const { container } = render(<BrowserRouter>
      <CategoryItem category={category}/>
    </BrowserRouter>);

    const children = [...container.firstChild.children];
    const imgElem = children.filter(el => !el.hasChildNodes())[0];
    expect(imgElem).toHaveStyle(`background-image: url(${category.imageUrl})`);

    const titleElem = screen.getByText(category.title);
    expect(titleElem).toBeInTheDocument();

    const shopNowElem = screen.getByText(/shop now/i);
    expect(shopNowElem).toBeInTheDocument();
  })

  test('it should navigate to correct route when Category is clicked', () => {
    const category = generateTestCategory();
    
    const mockNavigate = jest.fn();
    const mockUseNavigate = jest.spyOn(reactRouterDom, 'useNavigate');
    mockUseNavigate.mockReturnValue(mockNavigate);

    const { container } = render(<BrowserRouter>
      <CategoryItem category={category}/>
    </BrowserRouter>);


    const categoryElem = container.firstChild;

    fireEvent.click(categoryElem);

    expect(mockNavigate).toBeCalledWith(category.route);
  })
})

function generateTestCategory() {
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

  const category1 = {
    id: 'cat1',
    title: 'cat1',
    route: 'shop/cat1',
    imageUrl: 'http://testhost.com/cat1',
    items: items1
  };

  return category1;
}
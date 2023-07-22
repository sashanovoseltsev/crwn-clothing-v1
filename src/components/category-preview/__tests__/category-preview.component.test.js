import { screen, fireEvent } from '@testing-library/react';

import * as reactRouterDom from 'react-router-dom';

import { renderWithProviders } from '../../../utils/test/test.utils';
import CategoryPreview from '../category-preview.component';

import { generateTestCategoryItem } from '../../../utils/test/test.utils';

// prepare jest.spyOn
jest.mock('react-router-dom', () => (
  {
    __esModule: true, 
    ...jest.requireActual('react-router-dom')
  }));

describe('CategoryPreview tests', () => {
  test('it should render correctly with title and products provided', () => {
    const categoryTitle = 'Category 1';
    const items = [generateTestCategoryItem('1'), generateTestCategoryItem('2')];

    renderWithProviders(<CategoryPreview title={categoryTitle} products={items}/>);

    const btnElem = screen.getByRole('button', { name: new RegExp(categoryTitle, 'i')});
    expect(btnElem).toBeInTheDocument();

    const item1Elem = screen.getByText(new RegExp(items[0].name, 'i'));
    expect(item1Elem).toBeInTheDocument();

    const item2Elem = screen.getByText(new RegExp(items[1].name, 'i'));
    expect(item2Elem).toBeInTheDocument();
  })

  test('it should navigate to correct route when category title btn is clicked', () => {
    const title = 'Category 1';
    const items = [generateTestCategoryItem('1'), generateTestCategoryItem('2')];

    const mockNavigate = jest.fn();
    const mockUseNavigate = jest.spyOn(reactRouterDom, 'useNavigate');
    mockUseNavigate.mockReturnValue(mockNavigate);

    renderWithProviders(<CategoryPreview title={title} products={items}/>);

    const btnElem = screen.getByRole('button', { name: new RegExp(title, 'i')});
    fireEvent.click(btnElem);

    expect(mockNavigate).toBeCalledWith(`/shop/${title}`);

    jest.restoreAllMocks();
  })
})
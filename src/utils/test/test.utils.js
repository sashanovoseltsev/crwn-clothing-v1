import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../../store/root-reducer';
import { BrowserRouter } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({ reducer: rootReducer, preloadedState }),
    ...renderOptions
  } = {}
) {
  const Wrapper = ({children}) => {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    )
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export function renderWithProvidersAndRoute(
  ui,
  {
    route = '/',
    preloadedState = {},
    store = configureStore({ reducer: rootReducer, preloadedState }),
    ...renderOptions
  } = {}
) {
  const Wrapper = ({children}) => {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </Provider>
    )
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export function generateTestCartItem(id, qnt = 1, price = 10) {
  return {
    id: id,
    name: 'Item ' + id,
    price: price,
    imageUrl: 'http://testhost.com/url' + id,
    qnt: qnt
  }
}

export function generateTestCategoryItem(id, price = 10) {
  return {
    id: id,
    name: 'Item ' + id,
    price: price,
    imageUrl: 'http://testhost.com/url' + id
  }
}

export function generateTestCategory(categoryId, items) {    
  return {
    id: categoryId,
    title: categoryId,
    route: 'shop/' + categoryId,
    imageUrl: 'http://testhost.com/' + categoryId,
    items:  items || [generateTestCategoryItem('1'), generateTestCategoryItem('2')]
  };
}
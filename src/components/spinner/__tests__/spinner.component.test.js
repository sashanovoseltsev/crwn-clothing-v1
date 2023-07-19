import { render, screen } from '@testing-library/react';

import Spinner from '../spinner.component';

describe('Spinner component tests', () => {
  test('It should render correctly', () => {
    render(<Spinner />);

    const spinnerOverlayElem = screen.getByTestId('spinner');
    const spinnerContainerElem = spinnerOverlayElem.firstChild;

    expect(spinnerOverlayElem).toHaveStyle('height: 60vh; width: 100%;');
    expect(spinnerContainerElem).toHaveStyle('animation: spin 1s ease-in-out infinite;');
  })
})
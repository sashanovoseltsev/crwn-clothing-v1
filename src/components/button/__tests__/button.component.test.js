import { render, screen } from '@testing-library/react';
import Button, { BUTTON_TYPES }  from '../button.component';

describe('button tests', () => {
  test('should render base button when type is not specified', () => {
    render(<Button>Test</Button>);

    const buttonElement = screen.getByText(/test/i);
    expect(buttonElement).toHaveStyle('background-color: #333');
  });

  test('should render google button when type BUTTON_TYPES.google', () => {
    render(<Button buttonType={BUTTON_TYPES.google}/>);

    const buttonElement = screen.getByRole('button')
    expect(buttonElement).toHaveStyle('background-color: #4285f4');
  });

  test('should render inverted button when type BUTTON_TYPES.inverted', () => {
    render(<Button buttonType={BUTTON_TYPES.inverted}/>);

    const buttonElement = screen.getByRole('button')
    expect(buttonElement).toHaveStyle('background-color: white');
  });

  test('should render disabled button with spinner when type isLoading=true', () => {
    const { container } = render(<Button isLoading={true}>Test</Button>);

    const buttonElement = container.getElementsByTagName('button')[0];
    expect(buttonElement).toHaveStyle('background-color: white');
    //expect(buttonElement).toHaveAttribute('disabled');
    expect(buttonElement).toBeDisabled();
    const spinnerElement = buttonElement.getElementsByTagName('div')[0];
    expect(spinnerElement).toHaveStyle('animation: spin 1s ease-in-out infinite; width: 3rem; height: 3rem;');
  });
});
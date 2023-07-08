import { render, screen, fireEvent } from '@testing-library/react';

import FormInput from '../form-input.component';
import { shrinkLabel } from '../form-input.styles';

describe('FormInput component tests', () => {
  test('It should render correctly without value provided', () => {
    render(<FormInput id={"testId"} label={"testLabel"} />);

    const labelElem = screen.getByText(/testLabel/i);

    expect(labelElem).toBeInTheDocument();
    expect(labelElem).toHaveAttribute("for", "testId");
    expect(labelElem).toHaveStyle('top: 1rem;');
    expect(labelElem).toHaveStyle('font-size: 1.6rem;');
    expect(labelElem).toHaveStyle('color: grey;');

    const inputElem = screen.getByLabelText("testLabel");
    expect(inputElem).toBeInTheDocument();
    expect(inputElem).toHaveAttribute("id", "testId");
    expect(inputElem).toHaveClass("form-input");
  })

  test('Label should shrink when value is provided', () => {
    render(<FormInput id={"testId"} label={"testLabel"} value={"testValue"} />);

    const labelElem = screen.getByText(/testLabel/i);
    expect(labelElem).toBeInTheDocument();

    const inputElem = screen.getByDisplayValue('testValue');
    expect(inputElem).toBeInTheDocument();

    var shrinkStyles = shrinkLabel.reduce((acc, s) => acc + s)
      .replaceAll(" ", "")
      .split("\n")
      .filter(s => s !== "");

    shrinkStyles.forEach(style => {
      expect(labelElem).toHaveStyle(style);
    });
  });
})

// top: -1.4rem;
// font-size: 1.2rem;
// color: ${color.main};
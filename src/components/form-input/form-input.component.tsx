import { InputHTMLAttributes, FC } from "react";

import { FormGroupContainer, Label } from "./form-input.styles";

type FormInputProps = { label: string } & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ id, label, ...otherProps }) => {
  return (
    <FormGroupContainer>
      <input className="form-input" id={id} {...otherProps} />
      {label && (
        <Label shrink={Boolean(
          otherProps.value &&
          typeof otherProps.value === 'string' &&
          otherProps.value.length
        )} htmlFor={id}>
          {label}
        </Label>
      )}
    </FormGroupContainer>
  );
};

export default FormInput;

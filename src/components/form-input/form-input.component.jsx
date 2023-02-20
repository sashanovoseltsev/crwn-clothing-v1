import { FormGroupContainer, Label } from "./form-input.styles.jsx";

const FormInput = ({ id, label, ...otherProps }) => {
  return (
    <FormGroupContainer>
      <input className="form-input" id={id} {...otherProps} />
      {label && (
        <Label shrink={otherProps.value.length} htmlFor={id}>
          {label}
        </Label>
      )}
    </FormGroupContainer>
  );
};

export default FormInput;

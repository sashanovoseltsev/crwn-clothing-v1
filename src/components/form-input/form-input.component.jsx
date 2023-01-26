import "./form-input.styles.scss";

const FormInput = ({ id, label, ...otherProps }) => {
  console.log(otherProps);
  return (
    <div className="form-group">
      <input className="form-input" id={id} {...otherProps} />
      {label && (
        <label
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form-input-label`}
          htmlFor={id}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;

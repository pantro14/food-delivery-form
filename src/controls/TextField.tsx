import { forwardRef, ForwardedRef } from "react";
import { FieldError } from "react-hook-form";

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: FieldError | undefined;
};
export const TextField = forwardRef(
  (
    { type = "text", className = "", label, error, ...other }: TextFieldProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className={label && "form-floating"}>
        <input
          type={type}
          className={`form-control ${className}`}
          placeholder={label}
          {...other}
          ref={ref}
        />
        {label && <label>{label}</label>}
        {error && <div className="text-danger">{error.message}</div>}
      </div>
    );
  }
);

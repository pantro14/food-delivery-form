import { forwardRef, ForwardedRef } from "react";
import { FieldError } from "react-hook-form";
import { SelectOptionType } from "../types";

type SelectFieldProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  label: string;
  error?: FieldError | undefined;
  options: SelectOptionType[];
};
export const Select = forwardRef(
  (
    { className = "", label, options, error, ...other }: SelectFieldProps,
    ref: ForwardedRef<HTMLSelectElement>
  ) => {
    return (
      <div className="form-floating">
        <select ref={ref} {...other} className={`form-control ${className}`}>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
        <label>{label}</label>
        {error && <div className="text-danger">{error.message}</div>}
      </div>
    );
  }
);

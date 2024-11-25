import { Control, useForm, useFormState } from "react-hook-form";
import { useRenderCount } from "../utils/useRenderCounts";

type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isSubmitting?: boolean;
  control?: Control<any, any>;
};

export const SubmitButton = (props: SubmitButtonProps) => {
  const {
    className = "btn-light",
    value,
    control = undefined,
    ...other
  } = props;

  let isSubmitting = undefined;
  if (control) ({ isSubmitting } = useFormState({ control }));

  return (
    <>
      <button
        type="submit"
        className={`btn ${className}`}
        disabled={isSubmitting == undefined ? false : isSubmitting}
        {...other}
      >
        {isSubmitting === undefined || isSubmitting === false ? (
          value
        ) : (
          <>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span role="status" className="ms-1">
              {value}
            </span>
          </>
        )}
      </button>
    </>
  );
};

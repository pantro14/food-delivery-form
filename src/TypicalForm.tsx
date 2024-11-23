import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useRenderCount } from "./utils/useRenderCounts";

type FoodDeliveryFormType = {
  customerName: string;
  mobile: string;
};
type FoodDeliveryFormErrorType = {
  customerName: string;
  mobile: string;
};

const RenderCount = useRenderCount();

export const TypicalForm = () => {
  const [values, setValues] = useState<FoodDeliveryFormType>({
    customerName: "",
    mobile: "",
  });
  const [errors, setErrors] = useState<FoodDeliveryFormType>({
    customerName: "",
    mobile: "",
  });
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const validateFormData = () => {
    let tempErrors: FoodDeliveryFormErrorType = {
      customerName: "",
      mobile: "",
    };
    if (values.customerName.trim() === "") {
      tempErrors.customerName = "Customer Name is required";
    }
    if (values.mobile.trim() === "") {
      tempErrors.mobile = "Mobile is required";
    }
    setErrors(tempErrors);
    return Object.values(tempErrors).every((error) => error === "");
  };

  const onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    console.log(values);
    e.preventDefault();
    if (validateFormData()) console.log("form data", values);
    else console.log("form is invalid");
  };

  return (
    <form autoComplete="off" onSubmit={onSubmit}>
      <RenderCount />
      <div className="form-floating mb-3">
        <input
          type="text"
          name="customerName"
          className="form-control"
          placeholder="Customer Name"
          value={values.customerName}
          onChange={handleInputChange}
        />
        <label>Customer Name</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          name="mobile"
          className="form-control"
          placeholder="Mobile"
          value={values.mobile}
          onChange={handleInputChange}
        />
        <label>Mobile</label>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

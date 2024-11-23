import { FieldErrors, useForm } from "react-hook-form";
import { useRenderCount } from "./utils/useRenderCounts";
import { TextField } from "./controls/TextField";
import { Select } from "./controls/Select";

type FoodDeliveryFormType = {
  orderNo: number;
  customerName: string;
  mobile: string;
  email: string;
  paymentMethod?: string;
  deliveryIn: number;
};

const paymentOptions = [
  { value: "", text: "Select" },
  { value: "online", text: "Paid Online" },
  { value: "COD", text: "Cash on Delivery" },
];
const deliveryInOptions = [
  { value: 0, text: "Select" },
  { value: 30, text: "Half an Hour" },
  { value: 60, text: "1 Hour" },
  { value: 90, text: "1.5 Hours" },
  { value: 120, text: "2 Hours" },
];

const RenderCount = useRenderCount();

export const FoodDeliveryForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FoodDeliveryFormType>({
    mode: "onChange",
    reValidateMode: "onSubmit",
    delayError: 500,
    defaultValues: {
      orderNo: new Date().valueOf(),
      customerName: "",
      mobile: "",
      email: "",
      paymentMethod: "",
      deliveryIn: 0,
    },
  });

  const onError = (error: FieldErrors) => {
    console.log("validation errors:", error);
  };

  const onSubmit = (formData: FoodDeliveryFormType) => {
    console.log(formData);
  };

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <RenderCount />
      <div className="row mb-2">
        <div className="col">
          <TextField label="Order No" disabled {...register("orderNo")} />
        </div>
        <div className="col">
          <div className="form-floating mb-3">
            <TextField
              label="Mobile"
              {...register("mobile", {
                minLength: { value: 10, message: "Must be 10 digits" },
                maxLength: { value: 10, message: "Must be 10 digits" },
                required: "This field is required",
              })}
              error={errors.mobile}
            />
          </div>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col">
          <TextField
            label="Customer Name"
            {...register("customerName", {
              required: "This field is required",
            })}
            error={errors.customerName}
          />
        </div>
        <div className="col">
          <TextField
            label="Email"
            {...register("email", {
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Incorrect email format",
              },
              validate: {
                notFake: (value) => {
                  return value !== "email@gmail.com" || "Email is fake";
                },
                notFromBlackListedDomain: (value) => {
                  return (
                    (!value.endsWith("@xyz.com") &&
                      !value.endsWith("@example.com")) ||
                    "Email is blacklisted"
                  );
                },
              },
            })}
            error={errors.email}
          />
        </div>
      </div>
      <div>list of ordered food items</div>
      <div className="row mb-2">
        <div className="col">
          <Select
            options={paymentOptions}
            label="Payment Method"
            {...register("paymentMethod", {
              required: "This field is required",
            })}
            error={errors.paymentMethod}
          />
        </div>
        <div className="col">
          <Select
            options={deliveryInOptions}
            label="Delivery Within"
            {...register("deliveryIn", {
              required: "This field is required",
            })}
            error={errors.paymentMethod}
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

import { useFormContext, useFormState } from "react-hook-form";
import { FoodDeliveryMasterFormType } from "../../../types";
import { TextField } from "../../../controls/TextField";
import { useRenderCount } from "../../../utils/useRenderCounts";

const RenderCount = useRenderCount();

export const FoodDeliveryMaster = () => {
  const { register } = useFormContext<FoodDeliveryMasterFormType>();

  const { errors } = useFormState<FoodDeliveryMasterFormType>({
    name: ["orderNo", "mobile", "customerName", "email"],
    exact: true,
  });

  return (
    <>
      {/* <RenderCount /> */}
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
    </>
  );
};

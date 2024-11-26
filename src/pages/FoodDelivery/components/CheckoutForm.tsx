import { useFormContext, useFormState } from "react-hook-form";
import { Select } from "../../../controls/Select";
import { CheckoutFormType } from "../../../types";
import { useRenderCount } from "../../../utils/useRenderCounts";

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

export const CheckoutForm = () => {
  const { register } = useFormContext<CheckoutFormType>();

  const { errors } = useFormState<CheckoutFormType>({
    name: ["paymentMethod", "deliveryIn"],
    exact: true,
  });

  return (
    <>
      {/* <RenderCount /> */}
      <div className="text-start fw-bold mt-4 mb-2">Checkout Details</div>
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
            error={errors.deliveryIn}
          />
        </div>
      </div>
    </>
  );
};

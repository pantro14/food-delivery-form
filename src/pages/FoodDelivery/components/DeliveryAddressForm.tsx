import { useFormContext, useFormState } from "react-hook-form";
import { TextField } from "../../../controls/TextField";
import { DeliveryAddressFormType } from "../../../types";

export const DeliveryAddressForm = () => {
  const { register } = useFormContext<{
    address: DeliveryAddressFormType;
  }>();

  const { errors } = useFormState<{
    address: DeliveryAddressFormType;
  }>({
    name: ["address"],
  });
  return (
    <>
      <div className="text-start fw-bold mt-4 mb-2">Delivery Address</div>
      <div className="row mb-3">
        <div className="col">
          <TextField
            label="Street Address"
            {...register("address.streetAddress", {
              required: "This field is required",
            })}
            error={errors.address?.streetAddress}
          />
        </div>
        <div className="col">
          <TextField
            label="City"
            {...register("address.city", {
              required: "This field is required",
            })}
            error={errors.address?.city}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <TextField
            label="Landmark"
            error={errors.address?.landmark}
            {...register("address.landmark")}
          />
        </div>
        <div className="col">
          <TextField
            label="State"
            error={errors.address?.state}
            {...register("address.state")}
          />
        </div>
      </div>
    </>
  );
};

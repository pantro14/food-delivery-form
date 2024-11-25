import {
  FieldErrors,
  FormProvider,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import { useRenderCount } from "../../utils/useRenderCounts";
import { CheckoutForm } from "./components/CheckoutForm";
import { FoodDeliveryFormType } from "../../types";
import { DeliveryAddressForm } from "./components/DeliveryAddressForm";
import { FoodDeliveryMaster } from "./components/FoodDeliveryMAster";
import { SubmitButton } from "../../controls/SubmitButton";
import { useEffect } from "react";

const RenderCount = useRenderCount();

export const FoodDeliveryForm = () => {
  const methods: UseFormReturn<FoodDeliveryFormType> =
    useForm<FoodDeliveryFormType>({
      mode: "onChange",
      defaultValues: {
        orderNo: new Date().valueOf(),
        customerName: "",
        mobile: "",
        email: "",
        paymentMethod: "",
        deliveryIn: 0,
        address: {
          streetAddress: "",
          landmark: "",
          city: "",
          state: "",
        },
      },
    });

  const { handleSubmit, control } = methods;

  const onError = (error: FieldErrors) => {
    console.log("validation errors:", error);
  };

  const onSubmit = async (formData: FoodDeliveryFormType) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(formData);
  };

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <RenderCount />
      <div>list of ordered food items</div>
      <FormProvider {...methods}>
        <FoodDeliveryMaster />
        <CheckoutForm />
        <DeliveryAddressForm />
      </FormProvider>
      <SubmitButton control={control} value="Submit" />
    </form>
  );
};

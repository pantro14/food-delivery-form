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
import { SubmitButton } from "../../controls/SubmitButton";
import { OrderFoodItems } from "./components/OrderFoodItems";
import { MasterFoodDeliveryForm } from "./components/MasterFoodDeliveryForm";

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
        foodItems: [{ name: "", quantity: 0 }],
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

  const onDemo = () => {};

  const onSubmit = async (formData: FoodDeliveryFormType) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
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
        <MasterFoodDeliveryForm />
        <OrderFoodItems />
        <CheckoutForm />
        <DeliveryAddressForm />
      </FormProvider>
      <SubmitButton control={control} value="Submit" />
      <button type="button" className="btn btn-secondary ms-2" onClick={onDemo}>
        Demo
      </button>
    </form>
  );
};

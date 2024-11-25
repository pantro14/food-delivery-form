export type SelectOptionType = { value: string | number; text: string };

export type CheckoutFormType = {
  paymentMethod: string;
  deliveryIn: number;
};
export type DeliveryAddressFormType = {
  streetAddress: string;
  landmark: string;
  city: string;
  state: string;
};
export type FoodDeliveryFormType = {
  address: DeliveryAddressFormType;
} & FoodDeliveryMasterFormType &
  CheckoutFormType;
export type FoodDeliveryMasterFormType = {
  orderNo: number;
  customerName: string;
  mobile: string;
  email: string;
};

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
export type OrderFoodItemType = { name: string; quantity: number };
export type FoodDeliveryFormType = {
  address: DeliveryAddressFormType;
  foodItems: OrderFoodItemType[];
} & MasterFoodDeliveryFormType &
  CheckoutFormType;
export type MasterFoodDeliveryFormType = {
  orderNo: number;
  customerName: string;
  mobile: string;
  email: string;
};

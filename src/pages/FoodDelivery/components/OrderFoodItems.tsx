import { useFieldArray, useFormContext, useFormState } from "react-hook-form";
import { OrderFoodItemType } from "../../../types";
import { TextField } from "../../../controls/TextField";

export const OrderFoodItems = () => {
  const { register, setValue } = useFormContext<{
    foodItems: OrderFoodItemType[];
  }>();

  const { errors } = useFormState<{
    foodItems: OrderFoodItemType[];
  }>({
    name: ["foodItems"],
  });

  const {
    fields,
    append,
    prepend,
    insert,
    swap,
    move,
    update,
    replace,
    remove,
  } = useFieldArray<{
    foodItems: OrderFoodItemType[];
  }>({
    name: "foodItems",
    rules: {
      required: { value: true, message: "At least one item is required" },
    },
  });

  const onRowAdd = () => {
    append([{ name: "Food", quantity: 1 }], {
      shouldFocus: true,
      focusName: "foodItems.0.quantity",
    });
    //prepend({ name: "Food", quantity: 1 });
    //insert(2, { name: "Food", quantity: 1 });
  };

  const onSwapAndMove = () => {
    //swap(1, 2);
    move(1, 2);
  };

  const onUpdateAndReplace = () => {
    //swap(1, 2);
    //update(0, { name: "Start", quantity: 5 });
    //setValue("foodItems.0.quantity", 10);
    replace([
      { name: "Food 1", quantity: 10 },
      { name: "Food 2", quantity: 11 },
    ]);
  };

  const onRowDelete = (index: number) => {
    remove(index);
  };

  return (
    <>
      <table className="table table-borderless table-hover">
        <thead>
          <tr>
            <th>Food</th>
            <th>Quantity</th>
            <th>
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={onRowAdd}
              >
                +Add
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => {
            return (
              <tr key={field.id}>
                <td>
                  <TextField
                    {...register(`foodItems.${index}.name`, {
                      required: "This field is required",
                    })}
                    error={errors.foodItems && errors.foodItems[index]?.name}
                  />
                </td>
                <td>
                  <TextField
                    type="number"
                    min="0"
                    {...register(`foodItems.${index}.quantity`, {
                      required: "This field is required",
                    })}
                    error={
                      errors.foodItems && errors.foodItems[index]?.quantity
                    }
                  />
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onRowDelete(index)}
                  >
                    DEL
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {errors.foodItems?.root && (
            <tr>
              <td colSpan={3}>
                <span className="text-danger">
                  {errors.foodItems?.root?.message}
                </span>
              </td>
            </tr>
          )}
        </tfoot>
      </table>
      {fields.length >= 4 && (
        <button
          type="button"
          className="btn btn-sm btn-secondary"
          onClick={onSwapAndMove}
        >
          Swap and Move
        </button>
      )}
      <button
        type="button"
        className="btn btn-sm btn-secondary"
        onClick={onUpdateAndReplace}
      >
        Update and Replace
      </button>
    </>
  );
};

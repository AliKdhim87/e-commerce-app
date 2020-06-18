import { Input } from "semantic-ui-react";
function AddProductToCart() {
  return (
    <Input
      type='number'
      min='1'
      value={1}
      palaceholder='Quantity'
      action={{
        color: "orange",
        content: "Add to Cart",
        icon: "plus cart",
      }}
    />
  );
}

export default AddProductToCart;

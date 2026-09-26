import Button from "../../ui/Button";
import { useCheckout } from "../bookings/useCheckout";

function CheckoutButton({ id }) {
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <Button
      variation="danger"
      size="small"
      onClick={() => checkout(id)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;

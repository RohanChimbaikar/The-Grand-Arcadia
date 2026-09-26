import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/16/solid";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

export const Logout = () => {
  const { logout, isLoading } = useLogout();

  return (
    <ButtonIcon onClick={logout} disabled={isLoading}>
      {isLoading ? <SpinnerMini /> : <ArrowRightEndOnRectangleIcon />}
    </ButtonIcon>
  );
};

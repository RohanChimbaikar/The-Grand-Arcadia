import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signUp,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Account sucessfully created. Please verify the account from the user's email address",
      );
    },
    onError: (error) => toast.error(error.message),
  });

  return { signup, isLoading };
}

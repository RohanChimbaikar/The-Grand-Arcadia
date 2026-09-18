import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditingData } = useMutation({
    mutationFn: ({ newCabin, id }) => createEditCabin(newCabin, id),
    onSuccess: () => {
      toast.success("Cabin SucessFully Edited");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },

    onError: (error) => toast.error(error.message),
  });
  return { editCabin, isEditingData };
}

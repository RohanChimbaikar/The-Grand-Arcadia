import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const {
    isPending: isDeleting,
    mutate: deleteData,
    error,
  } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success(`Booking Deleted successfully`);
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },

    onError: (error) =>
      toast.error(`There was a problem while deleting the booking ${error}`),
  });

  return { isDeleting, deleteData, error };
}

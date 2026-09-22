import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckIn() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    isPending: isCheckingIn,
    mutate: checkin,
    error,
  } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        hasPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate(`/`);
    },

    onError: (error) =>
      toast.error(`There was a problem while checking in ${error}`),
  });

  return { isCheckingIn, checkin, error };
}

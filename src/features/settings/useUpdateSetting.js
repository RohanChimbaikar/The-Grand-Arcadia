import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const {
    mutate: updateSettings,
    isLoading: isUpdating,
    error,
  } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Settings updated sucessfully");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: () => toast.error("Failed to update settings:", error.message),
  });

  return { updateSettings, isUpdating, error };
}

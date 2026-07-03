import { adminQueries } from "@/api";
import { queryClient } from "@/main";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => adminQueries.logout(),
    onSuccess: () => {
      queryClient.setQueryData(["me"], null);
      navigate("/admin/login");
    },
    onError: () => {},
  });
}

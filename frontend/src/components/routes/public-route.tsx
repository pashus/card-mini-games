import { queryClient } from "@/main";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
  const user = queryClient.getQueryData(["auth", "me"]);

  if (user) {
    return <Navigate to="/admin/yes-no-game" replace />;
  }

  return <Outlet />;
};

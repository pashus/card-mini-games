import { useMe } from "@/hooks";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
  const { data: isAuth, isError } = useMe();

  // const isAuth = queryClient.getQueryData(["me"]);

  if (isAuth && !isError) {
    return <Navigate to="/admin/yes-no-game" replace />;
  }

  return <Outlet />;
};

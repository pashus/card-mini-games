import { useMe } from "@/hooks";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { data: isAuth, isLoading, isError } = useMe();

  if (isLoading) return <>Загрузка...</>;

  if (!isAuth || isError) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

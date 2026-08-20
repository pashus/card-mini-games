import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import {
  AdminLoginPage,
  HomePage,
  YnAdminPage,
  YnCardPage,
  NotFoundPage,
  YnPage,
} from "@/pages";
import { Layout } from "@/components/layout";
import { RestInPeacePage } from "./pages/rest-in-peace/rest-in-peace-page";
import { ProtectedRoute, PublicRoute } from "./components";
import { useMe } from "@/hooks";

function App() {
  const { data } = useMe();

  if (data) {
    console.log(
      `Данные авторизованного пользователя: id: ${data.user.id}, email: ${data.user.email}`,
    );
  }

  const router = createBrowserRouter([
    {
      Component: Layout,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/yes-no-game", element: <YnPage /> },
        { path: "/yes-no-game/card/:id", element: <YnCardPage /> },
        { path: "/dark-jack-game", element: <div>Тёмный Джек</div> },
        { path: "/not-found", element: <NotFoundPage /> },
        { path: "*", element: <Navigate to="/not-found" replace /> },
        { path: "/rip", element: <RestInPeacePage /> },

        {
          element: <PublicRoute />,
          children: [
            {
              path: "/admin/login",
              element: <AdminLoginPage />,
            },
          ],
        },

        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "/admin/yes-no-game",
              element: <YnAdminPage />,
            },
            {
              path: "/admin/yes-no-game/categories",
              element: <div>Тут будет создание категорий</div>,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

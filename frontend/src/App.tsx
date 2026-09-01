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
        { path: "/", Component: HomePage },
        { path: "/yes-no-game", Component: YnPage },
        { path: "/yes-no-game/card/:id", Component: YnCardPage },
        { path: "/dark-jack-game", element: <div>Тёмный Джек</div> },
        { path: "/not-found", Component: NotFoundPage },
        { path: "*", element: <Navigate to="/not-found" replace /> },
        { path: "/rip", Component: RestInPeacePage },

        {
          element: <PublicRoute />,
          children: [
            {
              path: "/admin/login",
              Component: AdminLoginPage,
            },
          ],
        },

        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "/admin",
              element: <div>Тут будет выбор между админками</div>,
            },
            {
              path: "/admin/yes-no-game",
              Component: YnAdminPage,
            },
            {
              path: "/admin/yes-no-game/categories",
              element: <div>Тут будет создание категорий</div>,
            },
            {
              path: "/admin/dark-jack-game",
              element: <div>Тут будет админка для Тёмного Джека</div>,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

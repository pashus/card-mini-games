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

function App() {
  const router = createBrowserRouter([
    {
      Component: Layout,
      children: [
        // Основные роуты данеток и тёмного джека
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/yes-no-game",
          element: <YnPage />,
        },
        {
          path: "/yes-no-game/card/:id",
          element: <YnCardPage />,
        },

        {
          path: "/dark-jack-game",
          element: <div>Тёмный Джек</div>,
        },

        // Админ роуты
        {
          path: "/admin/login",
          element: <AdminLoginPage />,
        },
        {
          path: "/admin/yes-no-game",
          element: <YnAdminPage />,
        },

        // Разные роуты
        {
          path: "/not-found",
          element: <NotFoundPage />,
        },
        {
          path: "*",
          element: <Navigate to="/not-found" replace />,
        },
        {
          path: "/rip",
          element: <RestInPeacePage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { HomePage, YnAdminPage, YnCardPage, YnPage } from "@/pages";
import { Layout } from "@/components/layout";

function App() {
  const router = createBrowserRouter([
    {
      Component: Layout,
      children: [
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
          path: "/yes-no-game/admin",
          element: <YnAdminPage />,
        },
        {
          path: "/not-found",
          element: <h1>404: Страница не найдена</h1>,
        },
        {
          path: "*",
          element: <Navigate to="/not-found" replace />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

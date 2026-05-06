import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
          path: "*",
          element: <h1>404: Страница не найдена</h1>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

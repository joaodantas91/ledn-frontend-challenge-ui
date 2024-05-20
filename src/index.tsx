import ReactDOM from "react-dom/client";
import App from "./App";
import { makeServer } from "./server";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Planets from "./pages/Planets";
import Planet from "./pages/Planet";
import Dashboard from "./pages/Dashboard";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: "/planets",
        element: <Planets />,
      },
      {
        path: "/planets/:id",
        element: <Planet />,
      },
    ]
  },
]);

root.render(
  <RouterProvider router={router} />
);

makeServer();

import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import AdminLayouts from "./layouts/AdminLayouts";
import Dashboard from "./pages/Admin/Dashboard";
import Mahasiswa from "./pages/Admin/Mahasiswa";
import ProtectedRoute from "./components/ProtectedRoute";

const RouteList = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayouts />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "mahasiswa",
        element: <Mahasiswa />,
      },
    ],
  },
]);

export default RouteList;

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Programme } from "./pages/Programme";
import { Apply } from "./pages/Apply";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { StudentPortal } from "./pages/StudentPortal";
import { AdminPortal } from "./pages/AdminPortal";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "programme", element: <Programme /> },
      { path: "apply", element: <Apply /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <Login /> },
      { 
        element: <ProtectedRoute allowedRoles={['student', 'admin']} />,
        children: [
          { path: "student", element: <StudentPortal /> }
        ]
      },
      { 
        element: <ProtectedRoute allowedRoles={['admin']} />,
        children: [
          { path: "admin", element: <AdminPortal /> }
        ]
      }
    ],
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

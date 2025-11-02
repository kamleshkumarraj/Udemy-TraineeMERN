import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/Login.pages";
import App from "./App";
import HomePage from "./pages/Home.pages";
import NotFound from "./pages/Error.pages";
import RegisterPage from "./pages/Register.pages";
import EmailVerificationPage from "./pages/MailVerification.pages";
import SessionConflict from "./pages/MultipleDeviceLoggedIn";
import Cart from "./pages/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path : '/cart',
        element : <Cart />
      }
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/api/v1/verify-email/:token",
    element: <EmailVerificationPage />,
  },
  {
    path: "/many-device-handle",
    element: <SessionConflict />,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};

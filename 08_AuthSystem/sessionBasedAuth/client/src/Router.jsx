import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import LoginPage from './pages/Login.pages'
import App from './App'
import HomePage from './pages/Home.pages'
import NotFound from './pages/Error.pages'
import RegisterPage from './pages/Register.pages'

const router = createBrowserRouter([
  {
    path : '/',
    element : <App/>,
    errorElement : <NotFound />,
    children : [{
      path : '/',
      element : <HomePage />
    }]
  },
  {
    path : '/login',
    element : <LoginPage />
  },
  {
    path : '/register',
    element : <RegisterPage />
  }
])

export const Router = () => {
  return (
    <RouterProvider router={router} />
  )
}
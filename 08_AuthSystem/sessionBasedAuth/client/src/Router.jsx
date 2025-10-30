import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import LoginPage from './pages/Login.pages'
import App from './App'

export const Router = createBrowserRouter([
  {
    path : '/',
    element : <App/>,
    errorElement : <ErrorPage />,
    children : [{
      path : '/',
    }]
  },
  {
    path : '/login',
    element : <LoginPage />
  }
])
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Sale from './pages/Sale';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Category from './pages/Category';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';

// ----------------------------------------------------------------------

export default function Router() {
  const isLoged = localStorage.getItem('_token')
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: !isLoged ? <Navigate to="/login" replace />:<DashboardApp /> },
        { path: 'user', element: !isLoged ? <Navigate to="/login" replace />:<User /> },
        { path: 'category', element: !isLoged ? <Navigate to="/login" replace />:<Category /> },
        { path: 'products', element: !isLoged ? <Navigate to="/login" replace />:<Products /> },
        { path: 'blog', element: !isLoged ? <Navigate to="/login" replace />:<Blog /> },
        { path: 'sales', element: !isLoged ? <Navigate to="/login" replace />:<Sale /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/login" replace /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
    { path: '*', element: !isLoged && <Navigate to="/login" replace /> },
  ]);
}

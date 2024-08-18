import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login'
import App from './App';
import AuthProvider from './provider/AuthProvider';
import Register from './Pages/Register/Register';
import Products from './Pages/Products/Products';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import PrivateRoute from './routes/PrivateRoute';
const queryClient = new QueryClient()


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children:[
      {
        path:"/",
        element:<Home></Home>
      },
      {
        path:"/login",
        element:<Login></Login>
      },
      {
        path:"/register",
        element:<Register></Register>
      },
      {
        path:'/products',
        element:<PrivateRoute><Products></Products></PrivateRoute>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
     <HelmetProvider>
     <RouterProvider router={router} />
     </HelmetProvider>
     </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)

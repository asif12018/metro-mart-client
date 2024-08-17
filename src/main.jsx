import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Pages/Home/Home';
import App from './App';




const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children:[
      {
        path:"/",
        element:<Home></Home>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)

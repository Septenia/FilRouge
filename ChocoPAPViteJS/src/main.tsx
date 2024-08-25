import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { createBrowserRouter, RouterProvider,} from "react-router-dom";

import ErrorPage from "./error-page.tsx";

import { Home } from "./Components/Home/Home.tsx"
import { ShoppingList } from "./Components/Shop/ShoppingList.tsx"
import { CartFilled } from './Components/Shop/CartFilled/CartFilled.tsx';

import { CartContextProvider } from './Components/Shop/CartFilled/CartContext.tsx';

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/Boutique",
          element: <ShoppingList />,
        },
        {
          path: "/Panier",
          element: <CartFilled />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>
  </React.StrictMode>,
)

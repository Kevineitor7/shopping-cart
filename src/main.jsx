import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from '/home/kevineitor/repos/shopping-cart/src/components/Home/Home.jsx'
import Shop from './components/Shop/Shop.jsx'
import Cart from './components/Cart/Cart.jsx'
import ProductInfo from './components/ProductInfo/ProductInfo.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {index: true, element: <Home/>},
      {path: "shop", element: <Shop/>},
      {path: "cart", element: <Cart/>},
      {path: "product-info", element: <ProductInfo/>},
    ]
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

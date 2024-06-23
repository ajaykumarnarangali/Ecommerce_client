import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.js'

import Error from './page/Error.jsx'
import Login from './page/Login.jsx'
import Register from './page/Register.jsx'
import Home from './page/Home.jsx'
import Adminpanel from './page/Adminpanel.jsx'
import Allusers from './component/Allusers.jsx'
import Allproducts from './component/Allproducts.jsx'
import AdminOnly from './component/AdminOnly.jsx'
import Addproduct from './component/Addproduct.jsx'
import Editproduct from './component/Editproduct.jsx'
import CategoryProducts from './component/CategoryProducts.jsx'
import ProductDetail from './page/ProductDetail.jsx'
import Cart from './page/Cart.jsx'
import Protected from './component/Protected.jsx'
import Search from './page/Search.jsx'

const router = createBrowserRouter([{
  path: '/',
  element:
    <Provider store={store}>
      <App />
    </Provider>
  ,
  errorElement: <Error />,
  children: [
    { path: '/', element: <Home /> },
    { path: '/sign-in', element: <Login /> },
    { path: '/sign-up', element: <Register /> },
    { path: '/product-category', element: <CategoryProducts /> },
    { path: '/product-Details/:id', element: <ProductDetail /> },
    { path: '/search', element: <Search /> },
    {
      element: <Protected />, children:[
        { path: '/cart', element: <Cart /> },
      ]
    },
    {
      element: <AdminOnly />, children: [
        {
          path: '/admin-panel', element: <Adminpanel />,
          children: [
            { path: 'all-users', element: <Allusers /> },
            { path: 'all-products', element: <Allproducts /> },
            { path: 'add-product', element: <Addproduct /> },
            { path: 'edit-product/:id', element: <Editproduct /> },
          ]
        }
      ]
    }
  ]
}])



ReactDOM.createRoot(document.getElementById('root')).render(

  <RouterProvider router={router} />

)

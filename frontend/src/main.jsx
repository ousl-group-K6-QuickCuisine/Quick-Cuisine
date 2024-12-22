// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createRoutesFromElements } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.js'

//Auth
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'

//Private Route
import PrivateRoute from './Components/PrivateRoute.jsx'
import { Profile } from './pages/User/Profile.jsx'

//admin Route
import AdminRoute from './pages/Admin/AdminRoute.jsx'
import UserList from './pages/Admin/UserList.jsx'
import CategoryList from './pages/Admin/CategoryList.jsx'
import ProductList from './pages/Admin/ProductList.jsx'
import ProductUpdate from './pages/Admin/ProductUpdate.jsx'
import AllProduct from './pages/Admin/AllProduct.jsx'
import Home from './pages/Home.jsx'
import Favorites from './pages/Products/Favorites.jsx'
import ProductDetails from './pages/Products/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import Shop from './pages/Shop.jsx'
import OrderList from './pages/Admin/OrderList.jsx'

import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import Shipping from './pages/Orders/Shipping.jsx'
import PlaceOrder from './pages/Orders/PlaceOrders.jsx'
import Order from './pages/Orders/Order.jsx'
import AboutUs from './pages/AboutUS.jsx'
import UserOrder from './pages/User/UserOrder.jsx'
import AdminDashboard from './pages/Admin/AdminDashboard.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/aboutUs" element={<AboutUs />} />
      <Route index={true} path="/" element={<Home />} />
      <Route index={true} path="/product/:id" element={<ProductDetails />} />
      <Route index={true} path="/menu" element={<Shop />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route index={true} path="/cart" element={<Cart />} />
        <Route index={true} path="/favorite" element={<Favorites />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<Order />} />
        <Route index={true} path="/user-orders" element={<UserOrder />} />
      </Route>
      {/* Admin Route */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="user_list" element={<UserList />} />
        <Route path="category" element={<CategoryList />} />
        <Route path="ProductList" element={<ProductList />} />
        <Route path="allproductslist" element={<AllProduct />} />
        <Route path="product/update/:_id" element={<ProductUpdate />} />
        <Route path="order-lists" element={<OrderList />} />
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PayPalScriptProvider>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
)

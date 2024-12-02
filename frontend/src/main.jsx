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
import Home from './Home.jsx'
import Favorites from './pages/Products/Favorites.jsx'
import ProductDetails from './pages/Products/ProductDetails.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route index={true} path="/" element={<Home />} />
        <Route index={true} path="/favorite" element={<Favorites />} />
        <Route index={true} path="/product/:id" element={<ProductDetails />} />
      </Route>
      {/* Admin Route */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="user_list" element={<UserList />} />
        <Route path="category" element={<CategoryList />} />
        <Route path="ProductList" element={<ProductList />} />
        <Route path="allproductslist" element={<AllProduct />} />
        <Route path="product/update/:_id" element={<ProductUpdate />} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)

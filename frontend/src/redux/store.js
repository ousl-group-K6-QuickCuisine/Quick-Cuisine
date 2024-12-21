import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { apiSlice } from './api/apiSlices'
import authReducer from './features/auth/authSlice'
import favoritesReducer from './features/Favorites/FavoritesSlice'
import { getFavoritesFromLocalStorage } from '../Utils/LocalStorage'
import cartSliceReducer from '../redux/cart/cartSlice'
import shopReducer from '../redux/features/shop/shopSlice'

const initialFavorites = getFavoritesFromLocalStorage() || []

const store = configureStore({
  devTools: true,
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    favorites: favoritesReducer,
    cart: cartSliceReducer,
    shop: shopReducer,
  },
  preloadedState: {
    favorites: initialFavorites,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})
setupListeners(store.dispatch)
export default store

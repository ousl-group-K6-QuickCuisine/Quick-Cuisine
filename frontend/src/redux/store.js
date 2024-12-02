import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { apiSlice } from './api/apiSlices'
import authReducer from './features/auth/authSlice'
import favoritesReducer from './features/Favorites/FavoritesSlice'
import { getFavoritesFromLocalStorage } from '../Utils/LocalStorage'

const initialFavorites = getFavoritesFromLocalStorage() || []

const store = configureStore({
  devTools: true,
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    favorites: favoritesReducer,
  },
  preloadedState: {
    favorites: initialFavorites,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})
setupListeners(store.dispatch)
export default store

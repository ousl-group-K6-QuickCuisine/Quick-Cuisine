import { apiSlice } from './apiSlices'
import { USER_URL } from '../constant'
// import { logout } from '../features/auth/authSlice'

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/auth`, //http://localhost:5000/api/user/auth
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/logout`, //http://localhost:5000/api/user/logout
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}`, //http://localhost:5000/api/user
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  userApiSlice

import { apiSlice } from './apiSlices'
import { ORDERS_URL, paypal_URL } from '../constant'

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createdOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: order,
      }),
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        body: details,
      }),
    }),
    getPaypalClientId: builder.query({
      query: () => ({
        url: paypal_URL,
      }),
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`, // Correct endpoint for user-specific orders
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: 'PUT',
      }),
    }),
    getTotalOrders: builder.query({
      query: () => `${ORDERS_URL}/total-orders`,
    }),
    getTotalSales: builder.query({
      query: () => `${ORDERS_URL}/total-sales`,
    }),
    getTotalSalesByDate: builder.query({
      query: () => `${ORDERS_URL}/total-sales-by-date`,
    }),
  }),
})

export const {
  useCreatedOrderMutation,
  useGetOrderDetailsQuery,
  useDeliverOrderMutation,
  usePayOrderMutation,
  useGetMyOrdersQuery,
  useGetPaypalClientIdQuery,
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
  useGetOrdersQuery,
} = orderApiSlice

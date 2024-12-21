import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../Components/Message'
import Loader from '../../Components/Loader'
import { clearCartItems } from '../../redux/cart/cartSlice'
import { useCreatedOrderMutation } from '../../redux/api/orderAiSlice'

const PlaceOrder = () => {
  const navigate = useNavigate()

  const cart = useSelector((state) => state.cart)

  const [createOrder, { isLoading, error }] = useCreatedOrderMutation()

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping')
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate])

  const dispatch = useDispatch()

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap()
      dispatch(clearCartItems())
      navigate(`/order/${res._id}`)
    } catch (error) {
      toast.error(error)
    }
  }

  return (
    <>
      <div className="container mx-auto mt-8">
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <div className="overflow-x-auto mb-8 mt-14">
            <table className="w-full border border-gray-300 text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Image</th>
                  <th className="px-4 py-2">Product</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index} className="odd:bg-white even:bg-gray-50">
                    <td className="p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td className="p-2">
                      <Link
                        to={`/product/${item._id}`}
                        className=" hover:underline"
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className="p-2">{item.qty}</td>
                    <td className="p-2">LKR {item.price.toFixed(2)}</td>
                    <td className="p-2">
                      LKR {(item.qty * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="bg-white border border-gray-300 p-6 rounded-lg mb-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Order Summary
          </h2>
          <ul className="text-gray-700 space-y-2">
            <li>
              <strong>Items:</strong> LKR {cart.itemsPrice}
            </li>
            <li>
              <strong>delivery fees:</strong> LKR {cart.shippingPrice}
            </li>
            <li>
              <strong>Tax:</strong> LKR {cart.taxPrice}
            </li>
            <li>
              <strong>Total:</strong> LKR {cart.totalPrice}
            </li>
          </ul>

          {error && <Message variant="danger">{error.data.message}</Message>}

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700">
              Delivery Address
            </h3>
            <p>
              <strong>Address:</strong> {cart.shippingAddress.address},{' '}
              {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{' '}
              {cart.shippingAddress.country}
            </p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Payment Method
            </h3>
            <p>
              <strong>Method:</strong> {cart.paymentMethod}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-full text-lg w-full mt-4 transition-all duration-300"
          disabled={cart.cartItems.length === 0}
          onClick={placeOrderHandler}
        >
          Place Order
        </button>

        {isLoading && <Loader />}
      </div>
    </>
  )
}

export default PlaceOrder

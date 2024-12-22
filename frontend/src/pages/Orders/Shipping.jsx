import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import {
  saveShippingAddress,
  savePaymentMethod,
} from '../../redux/cart/cartSlice'
import ProgressSteps from './ProgressSteps'

const Shipping = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [paymentMethod, setPaymentMethod] = useState('paypal')
  const [address, setAddress] = useState(shippingAddress.address || '')
  const [city, setCity] = useState(shippingAddress.city || '')
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
  const [country, setCountry] = useState(shippingAddress.country || '')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/place-order')
  }

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping')
    }
  }, [navigate, shippingAddress])

  return (
    <div className="container mx-auto">
      <div className="mt-[5rem] flex justify-around items-center flex-wrap">
        <form
          className="w-[40rem] bg-white p-6 rounded shadow-lg"
          onSubmit={submitHandler}
        >
          <h1 className="text-2xl font-semibold mb-4 text-gray-700">
            Delivery Address
          </h1>
          <div className="mb-4">
            <label className="block mb-2 text-gray-600">Address</label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter the address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-600">City</label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter the City"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-600">Postal Code</label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter the postal code"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-600">Country</label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter the Country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Select Method</label>
            <div className="mb-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-yellow-500"
                  name="paymentMethod"
                  value="PayPal"
                  checked={paymentMethod === 'PayPal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="ml-2 text-gray-700">
                  PayPal or Credit Card
                </span>
              </label>
            </div>
          </div>
          <button
            className="bg-yellow-500 py-2 px-4 rounded-full text-lg w-full text-white hover:bg-yellow-600 transition-colors"
            type="submit"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}

export default Shipping

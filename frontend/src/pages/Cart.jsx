/* eslint-disable no-unused-vars */
import { FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addToCart, removeFromCart } from '../redux/cart/cartSlice'
import './Cart.css'

const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }))
  }

  const removeFromHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    const redirectPath = '/shipping'
    navigate(`/login?redirect=${encodeURIComponent(redirectPath)}`)
  }

  return (
    <div className="cart-container ">
      {cartItems.length === 0 ? (
        <div className="cart-empty mt-[10rem]">
          Your cart is empty{' '}
          <Link to="/menu" className="cart-link">
            Go to Menu
          </Link>
        </div>
      ) : (
        <div className="cart-items mt-16">
          <h1 className="cart-title">Shopping Cart</h1>
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <div className="cart-item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="cart-item-details">
                <Link to={`/product/${item._id}`} className="cart-item-name">
                  {item.name}
                </Link>
                <div className="cart-item-type">{item.foodType}</div>
                <div className="cart-item-price"> LKR {item.price}</div>
              </div>
              <div className="cart-item-qty">
                <select
                  value={item.qty}
                  onChange={(e) =>
                    addToCartHandler(item, Number(e.target.value))
                  }
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option value={x + 1} key={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <button
                  className="cart-item-remove"
                  onClick={() => removeFromHandler(item._id)}
                >
                  <FaTrash size={20} />
                </button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <h2>
              Total Items: {cartItems.reduce((acc, item) => acc + item.qty, 0)}
            </h2>
            <h2>
              Total Price:{''}
              {cartItems
                .reduce((acc, item) => acc + item.price * item.qty, 0)
                .toFixed(2)}{' '}
              LKR
            </h2>
            <button
              disabled={cartItems.length === 0}
              className="cart-checkout-button"
              onClick={checkoutHandler}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart

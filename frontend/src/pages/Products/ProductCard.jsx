/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/cart/cartSlice'
import { toast } from 'react-toastify'
import HeartIcon from './HeartIcon'

const ProductCard = ({ p }) => {
  const dispatch = useDispatch()

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }))
    toast.success('Item added to cart!')
  }

  return (
    <div className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
      {/* Product Image and Category */}
      <section className="relative">
        <Link to={`/product/${p._id}`}>
          <img
            src={p.image}
            alt={p.name}
            className="w-full h-48 object-cover"
          />
        </Link>
        <span className="absolute top-2 left-2 bg-yellow-100 text-yellow-800 text-xs font-bold py-1 px-3 rounded-md">
          {p?.foodType}
        </span>
        <HeartIcon product={p} />
      </section>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h5 className="text-lg font-semibold text-gray-800">{p?.name}</h5>
          <p className="text-xl font-bold ">
            {p?.price?.toLocaleString('en-US', {
              style: 'currency',
              currency: 'LKR',
            })}
          </p>
        </div>

        {/* Buttons: Read More and Add to Cart */}
        <div className="flex justify-between items-center">
          <Link
            to={`/product/${p._id}`}
            className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-yellow-800 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          >
            <span>Read More</span>
          </Link>

          <button
            className="p-2 bg-yellow-100 text-yellow-800 rounded-full hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            onClick={() => addToCartHandler(p, 1)}
          >
            <AiOutlineShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard

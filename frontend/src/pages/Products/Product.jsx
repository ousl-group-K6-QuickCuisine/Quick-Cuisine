/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import HeartIcon from './HeartIcon'

const Product = ({ product }) => {
  return (
    <div className="w-[18rem] ml-[2rem] relative rounded-lg shadow-lg border bg-white transition-transform hover:scale-105">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-3 right-3">
          <HeartIcon product={product} />
        </div>
      </div>
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <Link to={`/product/${product._id}`}>
            <h2 className="text-lg font-semibold text-gray-800 hover:text-yellow-600 transition-colors">
              {product.name}
            </h2>
          </Link>
          <span
            className={`text-sm font-medium py-1 px-2 rounded-full w-fit ${
              product.countInStock > 0
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {product.countInStock > 0 ? 'Available' : 'Not Available'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-yellow-700 font-medium text-lg">
            LKR {product.price}
          </span>
          <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
            {product.foodType}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Product

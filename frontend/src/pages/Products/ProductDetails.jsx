import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from '../../redux/api/productApiSlice'
import Loader from '../../Components/Loader'
import Message from '../../Components/Message'
import { FaBox, FaClock, FaStar, FaStore } from 'react-icons/fa'
import HeartIcon from './HeartIcon'
import moment from 'moment'
import Ratings from './Ratings'
import ProductTabs from './ProductTabs'
import { addToCart } from '../../redux/cart/cartSlice'

const ProductDetails = () => {
  const { id: productId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId)
  const { userInfo } = useSelector((state) => state.auth)

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation()

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      await createReview({ productId, rating, comment }).unwrap()
      refetch()
      toast.success('Review added successfully')
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to add review')
    }
  }

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }))
    navigate('/cart')
  }

  return (
    <div className="p-6 lg:p-12 font-sans mt-8">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 font-semibold hover:underline mb-6"
      >
        &larr; Go Back
      </button>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message || 'Failed to load product'}
        </Message>
      ) : (
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Product Image */}
          <div className="lg:w-1/2 relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg shadow-md object-cover"
            />
            <HeartIcon product={product} />
            <span
              className={`absolute top-4 left-4 bg-yellow-500 ${
                product.countInStock > 0 ? 'bg-green-500' : 'bg-red-500'
              } text-white text-sm px-3 py-1 rounded-full shadow`}
            >
              {product.countInStock > 0 ? 'Available' : 'Not Available'}
            </span>
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-3xl font-semibold text-yellow-500">
              LKR {product.price.toLocaleString()}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-sm space-y-2">
                <p>
                  <FaStore className="inline mr-2 text-yellow-500" />
                  Food Type:{' '}
                  <span className="text-gray-700">{product.foodType}</span>
                </p>
                <p>
                  <FaClock className="inline mr-2 text-yellow-500" />
                  Added:{' '}
                  <span className="text-gray-700">
                    {moment(product.createdAt).fromNow()}
                  </span>
                </p>
                <p>
                  <FaStar className="inline mr-2 text-yellow-500" />
                  Reviews:{' '}
                  <span className="text-gray-700">{product.numReviews}</span>
                </p>
              </div>
              <div className="text-sm space-y-2">
                <p>
                  <FaStar className="inline mr-2 text-yellow-500" />
                  Ratings:{' '}
                  <span className="text-gray-700">{product.rating}</span>
                </p>

                <p>
                  <FaBox className="inline mr-2 text-yellow-500" />
                  In Stock:{' '}
                  <span className="text-gray-700">{product.countInStock}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Ratings
                value={product.rating}
                text={`${product.numReviews} Reviews`}
              />
              {product.countInStock > 0 && (
                <select
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="p-2 border rounded-lg"
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <button
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
              className={`px-6 py-3 rounded-lg text-white transition ${
                product.countInStock
                  ? 'bg-yellow-500 hover:bg-yellow-600'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
      <div className="mt-12">
        <ProductTabs
          loadingProductReview={loadingProductReview}
          userInfo={userInfo}
          submitHandler={submitHandler}
          rating={rating}
          setRating={setRating}
          comment={comment}
          setComment={setComment}
          product={product}
        />
      </div>
    </div>
  )
}

export default ProductDetails

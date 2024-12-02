/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Ratings from './Ratings'
import Loader from '../../Components/Loader'
import { useGetTopProductsQuery } from '../../redux/api/productApiSlice'
import Product from './Product'
const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const [activeTab, setActiveTab] = useState(1)
  const { data, isLoading } = useGetTopProductsQuery()
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber)
  }

  if (isLoading) {
    return <Loader />
  }

  if (!product) {
    // Fallback UI if the product data is not available
    return <div className="text-gray-500">Loading product data...</div>
  }

  return (
    <div className="flex flex-col md:flex-row">
      {/* Tab navigation */}
      <section className="mr-[5rem]">
        {['Write Your Reviews', 'All Reviews', 'Related Products'].map(
          (tabName, index) => (
            <div
              key={index}
              className={`flex-1 p-4 cursor-pointer text-lg transition-colors ${
                activeTab === index + 1
                  ? 'font-bold text-yellow-600 border-b-4 border-yellow-600'
                  : 'text-gray-600 hover:text-yellow-600'
              }`}
              onClick={() => handleTabClick(index + 1)}
            >
              {tabName}
            </div>
          )
        )}
      </section>

      {/* Tab content */}
      <section className="flex-1 p-4">
        {activeTab === 1 && (
          <div className="mt-4">
            {userInfo ? (
              <form onSubmit={submitHandler} className="space-y-4">
                <div className="mt-2">
                  <label
                    htmlFor="rating"
                    className="block text-xl text-yellow-600 mb-2"
                  >
                    Rating
                  </label>
                  <select
                    id="rating"
                    aria-label="Select Rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="p-2 border rounded-lg xl:w-[40rem] text-black focus:ring-2 focus:ring-yellow-600"
                  >
                    <option value="">Select</option>
                    <option value="1">Inferior</option>
                    <option value="2">Decent</option>
                    <option value="3">Great</option>
                    <option value="4">Excellent</option>
                    <option value="5">Exceptional</option>
                  </select>
                </div>
                <div className="my-2">
                  <label
                    htmlFor="comment"
                    className="block text-xl text-yellow-600 mb-2"
                  >
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    rows="3"
                    aria-label="Enter Comment"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="p-2 border rounded-lg xl:w-[40rem] text-black focus:ring-2 focus:ring-yellow-600"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Submit
                </button>
              </form>
            ) : (
              <p className="text-yellow-600">
                Please{' '}
                <Link to="/login" className="font-semibold hover:underline">
                  sign in
                </Link>{' '}
                to write a review.
              </p>
            )}
          </div>
        )}
        {activeTab === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-yellow-600">
              All Reviews
            </h2>
            {product.reviews?.length > 0 ? (
              product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-[#9CA3AF] p-4 rounded-lg xl:ml-[2rem] sm:ml-0 xl:w-[50rem] sm:w-full mb-5"
                >
                  <div className="flex justify-between items-center">
                    <strong className="text-yellow-600">{review.name}</strong>
                    <p className="text-yellow-300">
                      {new Date(review.createdAt).toISOString().split('T')[0]}
                    </p>
                  </div>
                  <p className="my-4 text-[#E0E0E0]">{review.comment}</p>
                  <Ratings value={review.rating} />
                </div>
              ))
            ) : (
              <p className="text-yellow-600 mt-4">
                No reviews available for this product.
              </p>
            )}
          </div>
        )}
        {activeTab === 3 && (
          <div className="text-yellow-600 mt-4 ml-[4rem] flex flex-wrap mb-6">
            {!data ? (
              <Loader />
            ) : (
              data.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))
            )}
          </div>
        )}
      </section>
    </div>
  )
}

export default ProductTabs

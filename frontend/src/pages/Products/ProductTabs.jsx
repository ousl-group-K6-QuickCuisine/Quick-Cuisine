/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Ratings from './Ratings'
import Loader from '../../Components/Loader'
import { useGetTopProductsQuery } from '../../redux/api/productApiSlice'
import Product from './Product'
import './ProductTabs.css'

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
    return <div className="text-gray-500">Loading product data...</div>
  }

  return (
    <div className="product-tabs">
      {/* Tab navigation */}
      <section className="tab-navigation">
        {['Write Your Reviews', 'All Reviews', 'Related Products'].map(
          (tabName, index) => (
            <div
              key={index}
              className={`tab-item ${activeTab === index + 1 ? 'active' : ''}`}
              onClick={() => handleTabClick(index + 1)}
            >
              {tabName}
            </div>
          )
        )}
      </section>

      {/* Tab content */}
      <section className="tab-content">
        {/* Write Your Reviews Tab */}
        {activeTab === 1 && (
          <div className="mt-4">
            {userInfo ? (
              <form onSubmit={submitHandler} className="review-form">
                <div className="mt-2">
                  <label htmlFor="rating" className="block">
                    Rating
                  </label>
                  <select
                    id="rating"
                    aria-label="Select Rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="">Select Review</option>
                    <option value="1">Terrible</option>
                    <option value="2">Not Good</option>
                    <option value="3">Average</option>
                    <option value="4">Very Good</option>
                    <option value="5">Outstanding</option>
                  </select>
                </div>
                <div className="my-2">
                  <label htmlFor="comment" className="block">
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    rows="3"
                    aria-label="Enter Comment"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </div>
                <button type="submit" disabled={loadingProductReview}>
                  Submit
                </button>
              </form>
            ) : (
              <p>
                Please{' '}
                <Link to="/login" className="font-semibold hover:underline">
                  sign in
                </Link>{' '}
                to write a review.
              </p>
            )}
          </div>
        )}

        {/* All Reviews Tab */}
        {activeTab === 2 && (
          <div>
            <h2>All Reviews</h2>
            {product.reviews?.length > 0 ? (
              product.reviews.map((review) => (
                <div key={review._id} className="review">
                  <div className="flex justify-between items-center">
                    <strong>{review.name}</strong>
                    <p>
                      {new Date(review.createdAt).toISOString().split('T')[0]}
                    </p>
                  </div>
                  <p className="my-4">{review.comment}</p>
                  <Ratings value={review.rating} />
                </div>
              ))
            ) : (
              <p>No reviews available for this product.</p>
            )}
          </div>
        )}

        {/* Related Products Tab */}
        {activeTab === 3 && (
          <div className="related-products">
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

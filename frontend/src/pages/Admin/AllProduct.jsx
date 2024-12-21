import { Link } from 'react-router-dom'
import moment from 'moment'
import { useAllProductsQuery } from '../../redux/api/productApiSlice'
import Loader from '../../Components/Loader'
import './AllProduct.css'

const AllProduct = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery()
  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <div> Error in Loading products</div>
  }
  console.log(products)

  return (
    <div className="container">
      <div className="admin-content">
        <div className="p-3 mt-20">
          <div className="ml-[2rem] text-xl font-bold h-22">
            All Products ({products.length})
          </div>

          <div className="product-list-containers">
            {products.map((product) => (
              <Link
                key={product._id}
                to={`/admin/product/update/${product._id}`}
                className="product-item"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-details">
                  <div className="product-header">
                    <h5 className="product-name">{product?.name}</h5>
                    <p className="product-date">
                      {moment(product.createAt).format('MMMM Do YYYY')}
                    </p>
                  </div>

                  <div className="product-description">
                    {product?.description?.substring(0, 160)}...
                  </div>

                  <div className="product-actions">
                    <Link
                      to={`/admin/product/update/${product._id}`}
                      className="update-button"
                    >
                      Update Product
                      <svg
                        className="w-3.5 h-3.5 ml-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </Link>
                    <p className="product-price">LKR {product?.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* <div className="admin-menu-container">
          <AdminMenu />
        </div> */}
      </div>
    </div>
  )
}

export default AllProduct

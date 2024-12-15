/* eslint-disable no-unused-vars */
import { Link, useParams } from 'react-router-dom'
import {
  useGetProductsQuery,
  useAllProductsQuery,
} from '../redux/api/productApiSlice'
import Loader from '../Components/Loader'
import Header from '../Components/Header'
import Message from '../Components/Message'
import Product from './Products/Product'

const Home = () => {
  const { keyword } = useParams()
  const { data, isLoading, isError } = useAllProductsQuery()
  console.log(data)
  return (
    <>
      {!keyword && <Header />}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{isError?.data.message}</Message>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="ml-[2rem] mt-[1rem] text-[3rem] text-yellow-700">
              Special Food Items
            </h1>
            <Link
              className="bg-yellow-600 text-white font-bold rounded-full py-2 px-10 mr-[18rem] mt-[1rem] hover:bg-yellow-600 transition-colors"
              to="/menu"
            >
              Search
            </Link>
          </div>

          <div className="mt-8">
            <div className="flex justify-around flex-wrap gap-6 mt-[2rem] mb-2 px-4">
              {data.length > 0 ? (
                data.slice(0, 20).map((product) => (
                  <div key={product._id} className="mb-6">
                    <Product product={product} />
                  </div>
                ))
              ) : (
                <Message variant="info">No products found</Message>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Home

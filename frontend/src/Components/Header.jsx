/* eslint-disable no-unused-vars */
import ProductCarousel from '../pages/Products/ProductCarousel'
import { useGetTopProductsQuery } from '../redux/api/productApiSlice'
import Loader from './Loader'

const Header = () => {
  const { data, isLoading, isError } = useGetTopProductsQuery()
  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <h1>Error</h1>
  }
  return (
    <>
      <div className=" w-full flex justify-around  ">
        <ProductCarousel />
      </div>
    </>
  )
}
export default Header

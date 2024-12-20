/* eslint-disable no-unused-vars */
import Message from '../../Components/Message'
import { useGetTopProductsQuery } from '../../redux/api/productApiSlice'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './Carousel.css'

const ProductCarousel = () => {
  const { data: products, isLoading, isError } = useGetTopProductsQuery()

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 20000,
  }

  return (
    <div className="product-carousel">
      {isLoading ? null : isError ? (
        <Message variant="danger">
          {isError?.data?.message || isError.message}
        </Message>
      ) : (
        <Slider {...settings} className="w-full">
          {products.map(({ image, _id, name }) => (
            <div key={_id}>
              <img src={image} alt={name} className="product-carousel-img" />
            </div>
          ))}
        </Slider>
      )}
    </div>
  )
}

export default ProductCarousel

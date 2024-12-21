/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import HeartIcon from './HeartIcon'
// import './Product.css'

const Product = ({ product }) => {
  return (
    <div className="w-[18rem] ml-[2rem] relative rounded-lg shadow-lg border bg-white transition-transform hover:scale-105">
      {' '}
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
          <span className=" font-medium text-lg">
            LKR {product.price - product.price * 0.1}{' '}
            <s className="text-sm text-red-300"> LKR{product.price}</s>
          </span>
          <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
            {product.foodType}
          </span>
        </div>
      </div>
    </div>
  )
}
// <div className="product-card">
//   <div className="product-image-container">
//     <img src={product.image} alt={product.name} className="product-image" />
//     <div className="heart-icon-container">
//       <HeartIcon product={product} />
//     </div>
//   </div>
//   <div className="product-details">
//     <div className="flex justify-between items-center">
//       <Link to={`/product/${product._id}`}>
//         <h2 className="product-title">{product.name}</h2>
//       </Link>
//       <span
//         className={`product-availability ${
//           product.countInStock > 0
//             ? 'product-available'
//             : 'product-not-available'
//         }`}
//       >
//         {product.countInStock > 0 ? 'Available' : 'Not Available'}
//       </span>
//     </div>
//     <div className="flex justify-between items-center">
//       <span className="product-price">LKR {product.price}</span>
//       <span className="product-food-type">{product.foodType}</span>
//     </div>
//   </div>
// </div>
// <div className="product-card">
//   <div className="product-image-container">
//     <img src={product.image} alt={product.name} className="product-image" />
//     <div className="heart-icon-container">
//       <HeartIcon product={product} />
//     </div>
//   </div>
//   <div className="product-details">
//     <div className="product-header">
//       <Link to={`/product/${product._id}`} className="product-title">
//         {product.name}
//       </Link>
//       <span
//         className={`product-availability ${
//           product.countInStock > 0 ? 'available' : 'unavailable'
//         }`}
//       >
//         {product.countInStock > 0 ? 'Available' : 'Not Available'}
//       </span>
//     </div>
//     <div className="product-footer">
//       <span className="product-price">LKR {product.price}</span>
//       <span className="product-food-type">{product.foodType}</span>
//     </div>
//   </div>
// </div>
// <div className="product-card">
//   <div className="product-image-container">
//     <img src={product.image} alt={product.name} className="product-image" />
//     <div className="heart-icon-container">
//       <HeartIcon product={product} />
//     </div>
//   </div>
//   <div className="product-details">
//     <div className="flex justify-between items-center">
//       <Link to={`/product/${product._id}`}>
//         <h2 className="product-title">{product.name}</h2>
//       </Link>
//       <span
//         className={`product-availability ${
//           product.countInStock > 0
//             ? 'product-available'
//             : 'product-not-available'
//         }`}
//       >
//         {product.countInStock > 0 ? 'Available' : 'Not Available'}
//       </span>
//     </div>
//     <div className="flex justify-between items-center">
//       <span className="product-price">LKR {product.price}</span>
//       <span className="product-food-type">{product.foodType}</span>
//     </div>
//   </div>
// </div>

export default Product

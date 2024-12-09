/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetFilteredProductsQuery } from '../redux/api/productApiSlice'
import {
  setCategories,
  setChecked,
  setProducts,
  setRadio,
} from '../redux/features/shop/shopSlice'
import Loader from '../Components/Loader'
import { useFetchAllCategoryQuery } from '../redux/api/categoryApiSlice'
import ProductCard from './Products/ProductCard'
import Product from './Products/Product'

const Shop = () => {
  const dispatch = useDispatch()
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  )
  const categoriesQuery = useFetchAllCategoryQuery()
  const [priceFilter, setPriceFilter] = useState('')
  const [nameFilter, setNameFilter] = useState('') // New state for name filtering
  const filteredProductsQuery = useGetFilteredProductsQuery({ checked, radio })

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data))
    }
  }, [categoriesQuery.data, dispatch])

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        let filteredProducts = filteredProductsQuery.data.filter((product) => {
          return (
            product.price.toString().includes(priceFilter) ||
            product.price === parseInt(priceFilter, 10)
          )
        })
        // Apply name filter here
        if (nameFilter) {
          filteredProducts = filteredProducts.filter((product) =>
            product.name.toLowerCase().includes(nameFilter.toLowerCase())
          )
        }
        dispatch(setProducts(filteredProducts))
      }
    }
  }, [
    checked,
    radio,
    filteredProductsQuery.data,
    dispatch,
    priceFilter,
    nameFilter,
  ])

  const handleBrandClick = (foodType) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.foodType === foodType
    )
    dispatch(setProducts(productsByBrand))
  }

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c != id)
    dispatch(setChecked(updatedChecked))
  }

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.foodType)
          .filter((foodType) => foodType != undefined)
      )
    ),
  ]

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value)
  }

  const handleNameChange = (e) => {
    setNameFilter(e.target.value)
  }

  return (
    <div className="mx-auto p-4 mt-[5rem]">
      <div className="flex flex-wrap md:flex-nowrap">
        {/* Filter Section */}
        <div className="p-4 rounded-md  md:w-[250px] mb-6 md:mb-0 shadow-md ml-2 flex-grow-0">
          <h2 className="text-center text-lg font-semibold mb-4 text-yellow-700">
            Filters
          </h2>

          {/* Category Filter */}
          <div className="mb-4">
            <h3 className="font-medium text-sm text-yellow-700 mb-2">
              Category
            </h3>
            {categories?.map((c) => (
              <div key={c._id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={c._id}
                  onChange={(e) => handleCheck(e.target.checked, c._id)}
                  className="mr-2"
                />
                <label htmlFor={c._id} className="text-sm text-gray-700">
                  {c.name}
                </label>
              </div>
            ))}
          </div>

          {/* Brand Filter */}
          <div className="mb-4">
            <h3 className="font-medium text-sm text-yellow-700 mb-2">
              Taste preference
            </h3>
            {uniqueBrands?.map((foodType) => (
              <div key={foodType} className="flex items-center mb-2">
                <input
                  type="radio"
                  id={foodType}
                  name="foodType"
                  onChange={() => handleBrandClick(foodType)}
                  className="mr-2"
                />
                <label htmlFor={foodType} className="text-sm text-gray-700">
                  {foodType}
                </label>
              </div>
            ))}
          </div>

          {/* Price Filter */}
          <div className="mb-4">
            <h3 className="font-medium text-sm text-yellow-700 mb-2">Price</h3>
            <input
              type="text"
              placeholder="Enter Price"
              value={priceFilter}
              onChange={handlePriceChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Reset Button */}
          <button
            className="w-full bg-yellow-500 text-white p-2 rounded-md mt-2"
            onClick={() => window.location.reload()}
          >
            Reset
          </button>
        </div>

        {/* Main Products Section */}
        <div className="p-3 w-full md:w-[calc(100%-250px)]">
          {/* Search Bar Above Products */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by Name"
              value={nameFilter}
              onChange={handleNameChange}
              className="w-full p-3 border border-yellow-800 rounded-full"
            />
          </div>

          {/* <h2 className="text-center text-lg font-semibold mb-4">
            {products?.length} Products
          </h2> */}
          <div className="flex flex-wrap">
            {products.length === 0 ? (
              <Loader />
            ) : (
              products?.map((p) => (
                <div className="p-3" key={p._id}>
                  <Product product={p} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop

import { useState } from 'react'
import { useNavigate } from 'react-router'
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from '../../redux/api/productApiSlice'
import { useFetchAllCategoryQuery } from '../../redux/api/categoryApiSlice'
import { toast } from 'react-toastify'
// import AdminMenu from './AdminMenu'
import '../Admin/ProductList.css'

const ProductList = () => {
  const [image, setImage] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [foodType, setFoodType] = useState('')
  const [category, setCategory] = useState()
  const [quantity, setQuantity] = useState('')
  const [stock, setStock] = useState(0)
  const [imageUrl, setImageUrl] = useState(null)

  const navigate = useNavigate()

  const [uploadProductImage] = useUploadProductImageMutation()
  const [createProduct] = useCreateProductMutation()
  const { data: categories } = useFetchAllCategoryQuery()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const productData = new FormData()
    productData.append('image', image)
    productData.append('name', name)
    productData.append('description', description)
    productData.append('price', price)
    productData.append('foodType', foodType)
    productData.append('category', category)
    productData.append('countInStock', stock)
    productData.append('quantity', quantity)

    try {
      const response = await createProduct(productData).unwrap()
      console.log('Product Created:', response)
      toast.success(`${response.name} created successfully`)
      navigate('/admin/allproductslist')
    } catch (error) {
      console.error('Error:', error)
      toast.error('Product creation failed.')
    }
  }

  const uploadFileHandler = async (e) => {
    const formData = new FormData()
    formData.append('image', e.target.files[0])
    try {
      const res = await uploadProductImage(formData).unwrap()
      console.log('API Response:', res)
      toast.success(res.message)
      setImage(res.image)
      setImageUrl(res.image)
    } catch (error) {
      toast.error(error?.data?.message || 'Image upload failed.')
    }
  }

  return (
    <div className="product-list-container">
      <div className="product-list-flex product-list-flex-row">
        <div className="">
          <span className="create-product-heading">Create Food Item</span>

          {imageUrl && (
            <img
              src={imageUrl}
              alt="Uploaded Product"
              className="product-image-preview"
            />
          )}

          <div className="mb-3">
            <label className="product-image-upload-label">
              {image ? image.name : 'Upload Image'}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
              />
            </label>
          </div>

          <div className="p-3">
            <div className="product-form-flex-wrap">
              <div className="product-form-input-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="product-form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="product-form-input-group">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  className="product-form-input"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="product-form-flex-wrap">
              <div className="product-form-input-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  className="product-form-input"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="product-form-input-group">
                <label htmlFor="foodType">Food Type</label>
                <input
                  type="text"
                  className="product-form-input"
                  value={foodType}
                  onChange={(e) => setFoodType(e.target.value)}
                />
              </div>
            </div>

            <label htmlFor="description" className="">
              Description
            </label>
            <textarea
              className="product-description-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className="product-form-flex">
              <div>
                <label htmlFor="stock">Count in Stock</label>
                <input
                  type="number"
                  className="product-form-input"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="category">Category</label>
                <select
                  className="product-category-select"
                  value={category || ''}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button onClick={handleSubmit} className="product-submit-button">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProductList

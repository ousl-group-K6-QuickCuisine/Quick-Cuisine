import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from '../../redux/api/productApiSlice'
import { useFetchAllCategoryQuery } from '../../redux/api/categoryApiSlice'
import { toast } from 'react-toastify'
// import { toast } from 'react-toastify'
import '../Admin/ProductList.css'

const ProductUpdate = () => {
  const params = useParams()
  const { data: productData } = useGetProductByIdQuery(params._id)

  const [image, setImage] = useState(productData?.image || '')
  const [name, setName] = useState(productData?.name || '')
  const [description, setDescription] = useState(productData?.description || '')
  const [price, setPrice] = useState(productData?.price || '')
  const [category, setCategory] = useState(productData?.category || '')
  const [foodType, setfoodType] = useState(productData?.foodType || '')
  const [stock, setStock] = useState(productData?.countInStock || '')
  const [quantity, setQuantity] = useState(productData?.quantity || '')

  const navigate = useNavigate()
  const { data: categories = [] } = useFetchAllCategoryQuery()
  const [uploadProductImage] = useUploadProductImageMutation()
  const [updateProduct] = useUpdateProductMutation()
  const [deleteProduct] = useDeleteProductMutation()

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name)
      setDescription(productData.description)
      setPrice(productData.price)
      setCategory(productData.category?._id)
      setQuantity(productData.quantity)
      setfoodType(productData.foodType)
      setStock(productData.countInStock)
      setImage(productData.image)
    }
  }, [productData])

  const uploadFileHandler = async (e) => {
    const formData = new FormData()
    formData.append('image', e.target.files[0])

    try {
      const res = await uploadProductImage(formData).unwrap()
      toast.success('Image added Successfully')
      setImage(res.image)
    } catch (error) {
      toast.error('Image does not uploaded')
      console.log(error)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('image', image)
      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('category', category)
      formData.append('quantity', quantity)
      formData.append('foodType', foodType)
      formData.append('countInStock', stock)

      const data = await updateProduct({ productId: params._id, formData })

      if (data?.error) {
        toast.error(data.error.message || 'An error occurred')
      } else {
        toast.success('Product successfully updated!')
        navigate('/admin/allproductslist')
      }
    } catch (err) {
      console.error(err)
      toast.error('Product update failed. Try again.')
    }
  }

  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        'Are you sure you want to delete this product?'
      )
      if (!answer) return

      const { data } = await deleteProduct(params._id)
      toast.success(`"${data.name}" is deleted`, {})
      navigate('/admin/allproductslist')
    } catch (err) {
      console.log(err)
      toast.error('Delete failed. Try again.', {})
    }
  }

  return (
    <div className="product-list-container">
      <div className="product-list-flex product-list-flex-row">
        <div className="">
          <div className="create-product-heading">Update Food</div>
          {image && (
            <img
              src={image}
              alt="Uploaded Product"
              className="product-image-preview"
            />
          )}

          <div className="mb-3">
            <label className="product-image-upload-label" name="image">
              {image ? image.name : 'Upload Image'}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? 'hidden' : 'text-black'}
              />
            </label>
          </div>

          <div className="p-3">
            <div className="product-form-flex-wrap">
              <div className="product-form-input-group">
                <label htmlFor="name" name="name">
                  Name
                </label>

                <input
                  type="text"
                  className="product-form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="product-form-input-group">
                <label htmlFor="name block" name="price">
                  Price
                </label>

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
                <label htmlFor="name block" name="quantity">
                  Quantity
                </label>

                <input
                  type="number"
                  className="product-form-input"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="product-form-input-group">
                <label htmlFor="name block" name="foodType">
                  foodType
                </label>

                <input
                  type="text"
                  className="product-form-input"
                  value={foodType}
                  onChange={(e) => setfoodType(e.target.value)}
                />
              </div>
            </div>

            <label htmlFor="" className="my-5" name="description">
              Description
            </label>
            <textarea
              type="text"
              className="product-description-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <div className="product-form-flex">
              <div>
                <label htmlFor="name block" name="stock">
                  Count in Stock
                </label>

                <input
                  type="number"
                  className="product-form-input"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="category" name="category">
                  Category
                </label>

                <select
                  placeholder="Choose Category"
                  className="product-category-select"
                  value={category || ''}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">select category</option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <button
                onClick={handleUpdate}
                className="py-4 px-10 mt-5 rounded-lg font-bold bg-green-600 text-white mr-6"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="py-4 px-10 mt-5 rounded-lg font-bold bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductUpdate

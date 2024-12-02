import { useState } from 'react'
import { toast } from 'react-toastify'
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchAllCategoryQuery,
} from '../../redux/api/categoryApiSlice'
import CategoryForm from '../../Components/CategoryForm'
import Modal from '../../Components/Modal'
import './CategoryList.css'

const CategoryList = () => {
  const [name, setName] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [updatingName, setUpdatingName] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  const [createCategory] = useCreateCategoryMutation()
  const [updateCategory] = useUpdateCategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()
  const { data: categories } = useFetchAllCategoryQuery()

  const handleCreateCategory = async (e) => {
    e.preventDefault()

    if (!name) {
      toast.error('Category name is required')
      return
    }
    try {
      const result = await createCategory({ name }).unwrap()
      if (result.error) {
        toast.error(result.error)
      } else {
        setName('')
        toast.success(`${result.name} is created`)
      }
    } catch (error) {
      console.error(error)
      toast.error('Creating Category failed, try again')
    }
  }

  const handleUpdateCategory = async (e) => {
    e.preventDefault()

    if (!updatingName) {
      toast.error('Category name is required')
      return
    }

    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: {
          name: updatingName,
        },
      }).unwrap()

      if (result.error) {
        toast.error(result.error)
        console.log(result.error)
      } else {
        toast.success(`${result.name} is updated`)
        setSelectedCategory(null)
        setUpdatingName('')
        setModalVisible(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap()

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(`${result.name} is deleted.`)
        setSelectedCategory(null)
        setModalVisible(false)
      }
    } catch (error) {
      console.error(error)
      toast.error('Category delete failed. Try again.')
    }
  }

  return (
    <div className="category-list-container">
      {/* Admin Menu */}
      <div className="admin-menu">
        {/* <div className="manage-categories-title">Manage Categories</div> */}
        <div className="category-form">
          <CategoryForm
            value={name}
            setValue={setName}
            handleSubmit={handleCreateCategory}
          />
        </div>
        <hr className="category-divider" />
        <div className="category-buttons-container">
          {categories?.map((category) => (
            <div key={category._id}>
              <button
                className="category-button"
                onClick={() => {
                  setModalVisible(true)
                  setSelectedCategory(category)
                  setUpdatingName(category.name)
                }}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <CategoryForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </Modal>
      </div>
    </div>
  )
}

export default CategoryList

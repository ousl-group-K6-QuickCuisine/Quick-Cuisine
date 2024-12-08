import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa'
import Loader from '../../Components/Loader'
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from '../../redux/api/usersApiSlices'
import Message from '../../Components/Message'
import './UserList.css'

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery()
  const [deleteUser] = useDeleteUserMutation()
  const [updateUser] = useUpdateUserMutation()

  const [editableUserId, setEditableUserId] = useState(null)
  const [editableUserData, setEditableUserData] = useState({
    username: '',
    email: '',
  })

  useEffect(() => {
    refetch()
  }, [refetch])

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id)
        toast.success('User deleted successfully!')
        refetch()
      } catch (error) {
        toast.error(error?.data?.message || error.message)
      }
    }
  }

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id)
    setEditableUserData({ username, email })
  }

  const updateHandler = async (id) => {
    try {
      await updateUser({ userId: id, ...editableUserData })
      setEditableUserId(null)
      refetch()
      toast.success('User updated successfully!')
    } catch (error) {
      toast.error(error?.data?.message || error.message)
    }
  }

  return (
    <div className="Users_list_container">
      <h1 className="Users_list_heading">Customer List</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <div className="overflow-auto">
          <table className="table_container">
            <thead>
              <tr>
                <th className="table_head">Name</th>
                <th className="table_head">Email</th>
                <th className="table_head">Admin</th>
                <th className="table_head">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user._id}>
                  <td>
                    {editableUserId === user._id ? (
                      <input
                        type="text"
                        value={editableUserData.username}
                        onChange={(e) =>
                          setEditableUserData({
                            ...editableUserData,
                            username: e.target.value,
                          })
                        }
                        className="update_input"
                      />
                    ) : (
                      user.username
                    )}
                  </td>
                  <td>
                    {editableUserId === user._id ? (
                      <input
                        type="email"
                        value={editableUserData.email}
                        onChange={(e) =>
                          setEditableUserData({
                            ...editableUserData,
                            email: e.target.value,
                          })
                        }
                        className="update_input"
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <FaCheck style={{ color: 'green' }} />
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    {editableUserId === user._id ? (
                      <button
                        className="update_btn bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                        onClick={() => updateHandler(user._id)}
                      >
                        Save
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FaEdit />
                        </button>
                        {!user.isAdmin && (
                          <button
                            onClick={() => deleteHandler(user._id)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            <FaTrash />
                          </button>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default UserList

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
import '../Admin/UserList.css'

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery()
  const [deleteUser] = useDeleteUserMutation()
  const [updateUser] = useUpdateUserMutation()

  const [editableUserId, setEditableUserId] = useState(null)
  const [editableUsername, setEditableUsername] = useState('')
  const [editableUserEmail, setEditableUserEmail] = useState('')

  useEffect(() => {
    refetch()
  }, [refetch])

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure ?')) {
      try {
        await deleteUser(id)
      } catch (error) {
        toast.error(error.data.message || error.error)
      }
    }
  }
  const toggleEdit = (id, username, email) => {
    setEditableUserId(id)
    setEditableUsername(username)
    setEditableUserEmail(email)
  }

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUsername,
        email: editableUserEmail,
      })
      setEditableUserId(null)
      refetch()
    } catch (error) {
      toast.error(error.data.message || error.error)
    }
  }

  return (
    <div className="Users_list_container">
      <h1 className="Users_list_heading">Customer Lists</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data.message || error.message}
        </Message>
      ) : (
        <div className="flex flex-col md:flex-row ">
          {/* Admin Menu */}
          <table className="table_container">
            <thead>
              <tr>
                <th className="table_head">Customer Name</th>
                <th className="table_head">Customer Email</th>
                <th className="table_head">Admin</th>
                <th className="table_head">Delete Customer</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="table_raw">
                  <td className="table_data">
                    {editableUserId === user._id ? (
                      <div className="table_raw_container">
                        <input
                          type="text"
                          value={editableUsername}
                          onChange={(e) => setEditableUsername(e.target.value)}
                          className="update_input"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="update_btn"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="table_raw_container">
                        {user.username}
                        {''}
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaEdit
                            className="ml-[1rem]"
                            style={{ color: 'blue' }}
                          />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="table_data">
                    {editableUserId === user._id ? (
                      <div className="table_raw_container">
                        <input
                          type="text"
                          value={editableUserEmail}
                          onChange={(e) => setEditableUserEmail(e.target.value)}
                          className="update_input"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="update_btn"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="table_raw_container">
                        <p>{user.email}</p>
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaEdit
                            className="ml-[1rem]"
                            style={{ color: 'blue' }}
                          />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="table_data">
                    {user.isAdmin ? (
                      <FaCheck style={{ color: 'green' }} />
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td className="table_data">
                    {!user.isAdmin && (
                      <div className="flex">
                        <button
                          className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded"
                          onClick={() => deleteHandler(user._id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
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

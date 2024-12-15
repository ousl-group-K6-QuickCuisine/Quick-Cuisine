import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../../Components/Loader'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { Link } from 'react-router-dom'
import { useProfileMutation } from '../../redux/api/usersApiSlices'
import InputField from '../../Components/InputField'
import { Button } from '../../Components/Button'

export const Profile = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { userInfo } = useSelector((state) => state.auth)

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation()

  useEffect(() => {
    setUsername(userInfo.username)
    setEmail(userInfo.email)
  }, [userInfo.username, userInfo.email])

  const dispatch = useDispatch()

  const submitHandler = async (e) => {
    e.preventDefault()

    if (!username || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields')
      return
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
    } else if (password.length < 8) {
      toast.error('Password must be at least 8 characters long')
    } else if (!/[A-Z]/.test(password)) {
      toast.error('Password must contain at least one uppercase letter')
    } else if (!/[a-z]/.test(password)) {
      toast.error('Password must contain at least one lowercase letter')
    } else if (!/[0-9]/.test(password)) {
      toast.error('Password must contain at least one number')
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      toast.error('Password must contain at least one special character')
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username: username,
          email: email,
          password: password,
        }).unwrap()
        dispatch(setCredentials({ ...res }))
        setPassword('')
        setConfirmPassword('')
        toast.success('Profile Updated Successfully')
      } catch (error) {
        toast.error(error?.data?.message || error.message)
      }
    }
  }

  return (
    <div className="container mx-auto p-6 mt-[6rem] bg-white shadow-lg rounded-lg max-w-4xl">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Update Profile
      </h2>
      <div className="flex flex-col md:flex-row md:justify-center gap-10">
        <div className="md:w-2/3">
          <form onSubmit={submitHandler} className="space-y-4">
            <InputField
              placeholder="Enter Name"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              label="Name"
            />
            <InputField
              placeholder="Enter Email"
              type="email"
              value={email}
              label="Email"
              readOnly
            />
            <InputField
              placeholder="Enter Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
            />
            <InputField
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              label="Confirm Password"
            />
            <div className="flex justify-between mt-6">
              <Button type="submit" buttonName="Update" />
              <Link to="/user-orders">
                <Button buttonName="My Orders" />
              </Link>
            </div>
          </form>
        </div>
        {loadingUpdateProfile && <Loader />}
      </div>
    </div>
  )
}

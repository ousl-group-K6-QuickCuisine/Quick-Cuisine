import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { useRegisterMutation } from '../../redux/api/usersApiSlices'
import Loader from '../../Components/Loader'
import InputField from '../../Components/InputField'
import ButtonForRegister from '../../Components/ButtonForRegister'
import './Register.css'

const Register = () => {
  const [username, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [register, { isLoading }] = useRegisterMutation()
  const { userInfo } = useSelector((state) => state.auth)

  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])

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
        const res = await register({ username, email, password }).unwrap()
        dispatch(setCredentials({ ...res }))
        navigate(redirect)
        toast.success('User successfully registered')
      } catch (err) {
        if (err?.data?.message === 'Email already exists') {
          toast.error('This email is already registered')
        } else {
          toast.error(err.data.message || 'Something went wrong')
        }
      }
    }
  }

  return (
    <section className="register_container mt-16">
      <div className="register_from ">
        <h1 className="register_header ">Register</h1>

        <form onSubmit={submitHandler} className="form_container">
          <InputField
            label="Name"
            type="text"
            id="name"
            placeholder="Enter name"
            value={username}
            onChange={(e) => setName(e.target.value)}
          />

          <InputField
            label="Email Address"
            type="email"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            label="Password"
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <InputField
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <ButtonForRegister
            type={'submit'}
            disabled={isLoading}
            isLoading={isLoading}
          >
            Register
          </ButtonForRegister>

          {isLoading && <Loader />}
        </form>

        <div className="account-prompt">
          <p className="redirect-message">
            Already have an account?{' '}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : '/login'}
              className="login_link"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Register

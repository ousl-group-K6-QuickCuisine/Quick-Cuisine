import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { useLoginMutation } from '../../redux/api/usersApiSlices'
import Loader from '../../Components/Loader'
import InputField from '../../Components/InputField'
import ButtonForLogin from '../../Components/ButtonForLogin'
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()
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

    if (!email) {
      toast.error('Email is required')
      return
    }
    if (!password) {
      toast.error('Password is required')
      return
    }

    // try {
    //   const res = await login({ email, password }).unwrap()
    //   dispatch(setCredentials({ ...res }))
    //   navigate(redirect)
    // } catch (error) {
    //   if (error?.data?.message === 'Invalid email or password') {
    //     toast.error('Invalid email or password')
    //   } else if (error?.status === 500) {
    //     toast.error('Server error, please try again later')
    //   } else if (error?.status === 404) {
    //     toast.error('User not found')
    //   } else {
    //     toast.error(error?.data?.message || 'Something went wrong')
    //   }
    // }

    try {
      const res = await login({ email, password }).unwrap()
      dispatch(setCredentials({ ...res }))
      navigate(redirect)
    } catch (error) {
      const message = error?.data?.message || 'Something went wrong'
      if (message === 'Invalid email or password') {
        toast.error('Invalid email or password')
      } else if (error?.status === 500) {
        toast.error('Server error, please try again later')
      } else if (error?.status === 404) {
        toast.error('User not found')
      } else {
        toast.error(message)
      }
    }
  }

  return (
    <section className="login_container">
      <div className="login_form ">
        <h1 className="login_header">Sign In</h1>

        <form onSubmit={submitHandler} className="form_container">
          <InputField
            label="Email Address"
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            label="Password"
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <ButtonForLogin
            type="submit"
            disabled={isLoading}
            isLoading={isLoading}
          ></ButtonForLogin>

          {isLoading && <Loader />}
        </form>

        <div className="account-prompt">
          <p className="redirect-message">
            New Customer?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
              className="register_link"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Login

// Button.js
import '../Components/Button.css'
// eslint-disable-next-line react/prop-types
const ButtonForLogin = ({ type, isLoading }) => {
  return (
    <div className="btn-container">
      <button disabled={isLoading} type={type} className="btn">
        {isLoading ? 'logging...' : 'Login'}
      </button>
    </div>
  )
}

export default ButtonForLogin

// Button.js
import '../Components/Button.css'
const ButtonForLogin = ({ type, disabled, isLoading, children }) => {
  return (
    <div className="btn-container">
      <button disabled={isLoading} type="submit" className="btn">
        {isLoading ? 'logging...' : 'Login'}
      </button>
    </div>
  )
}

export default ButtonForLogin

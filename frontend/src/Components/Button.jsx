// Button.js
import '../Components/Button.css'
const Button = ({ type, disabled, isLoading, children }) => {
  return (
    <div className="btn-container">
      <button disabled={isLoading} type="submit" className="btn">
        {isLoading ? 'Registering...' : 'Register'}
      </button>
    </div>
  )
}

export default Button

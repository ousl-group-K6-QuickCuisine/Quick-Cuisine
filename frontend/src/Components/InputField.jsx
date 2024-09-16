// InputField.js

import '../Components/InputField.css'
const InputField = ({ label, type, id, value, onChange, placeholder }) => {
  return (
    <div className="input_container">
      <label htmlFor={id} className="input_label">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="input_design"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default InputField

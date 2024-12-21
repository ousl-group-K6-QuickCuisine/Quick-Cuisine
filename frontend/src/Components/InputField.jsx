// InputField.js

import '../Components/InputField.css'
// eslint-disable-next-line react/prop-types
const InputField = ({ label, type, value, onChange, placeholder }) => {
  return (
    <div className="input_container">
      <label htmlFor={'label'} className="input_label">
        {label}
      </label>
      <input
        type={type}
        className="input_design"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default InputField

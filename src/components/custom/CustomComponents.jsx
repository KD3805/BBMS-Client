/**
 * InputField Component for cleaner JSX
 */
const InputField = ({ label, id, type = "text", placeholder, value, error, onChange, max, readOnly = false }) => (
    <div>
      <label htmlFor={id} className="block font-bold">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={type}
        id={id}
        className={`w-full p-2 border rounded focus:outline-none ${readOnly ? "bg-transparent border-black focus:outline-none" : "focus:ring focus:ring-blue-300"}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        max={max}
        readOnly={readOnly}
      />
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
  
  /**
   * SelectField Component for Dropdowns
   */
  const SelectField = ({ label, id, options, value, error, onChange }) => (
    <div>
      <label htmlFor={id} className="block font-bold">
        {label} <span className="text-red-500">*</span>
      </label>
      <select
        id={id}
        className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        value={value}
        onChange={onChange}
      >
        <option value="">-Select {label}-</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
  
  /**
   * TextAreaField Component
   */
  const TextAreaField = ({ label, id, placeholder, value, error, onChange, mandatory = true }) => (
    <div>
      <label htmlFor={id} className="block font-bold">
        {label} 
        {mandatory && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={id}
        rows={3}
        className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );

  const AuthButtons = ({ type = "submit", loading = false, isExpired = false }) => {

  }

  export { InputField, SelectField, TextAreaField }
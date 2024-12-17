import React, { useState } from "react";
import axios from "axios";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    emp_name: "",
    emp_id: "",
    email_id: "",
    phone_no: "",
    dept: "HR",
    age: "",
    dob: "",
    doj: "",
    gender: "Male",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};
    if (!formData.emp_name) newErrors.emp_name = "Name is required.";
    if (!formData.emp_id.match(/^[a-zA-Z0-9]{1,10}$/))
      newErrors.emp_id = "Employee ID must be alphanumeric and max 10 chars.";
    if (!formData.email_id.match(/^\S+@\S+\.\S+$/))
      newErrors.email_id = "Invalid email format.";
    if (!formData.phone_no.match(/^\d{10}$/))
      newErrors.phone_no = "Phone Number must be 10 digits.";
    if (!formData.age || formData.age < 18)
      newErrors.age = "Age must be at least 18.";
    if (!formData.dob) newErrors.dob = "Date of Birth is required.";
    if (!formData.doj || new Date(formData.doj) > new Date())
      newErrors.doj = "Date of Joining cannot be in the future.";
    if (!formData.role) newErrors.role = "Role is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:5001/employees", formData);
          if (response && response.data) {
          setMessage(response.data.message);
          setErrors({});
        } else {
          throw new Error('Unexpected response structure');
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          setMessage(error.response.data.error); 
        } else {
          setMessage(error.message || "An unknown error occurred.");
        }
      }
    }
  };
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <h2>Add Employee</h2>
      {message && <p className="alert alert-info">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="emp_name">Name:</label>
          <input
            type="text"
            name="emp_name"
            id="emp_name"
            placeholder="Name"
            value={formData.emp_name}
            onChange={handleChange}
          />
          <small>{errors.emp_name}</small>
        </div>

        <div className="form-group">
          <label htmlFor="emp_id">Employee ID:</label>
          <input
            type="text"
            name="emp_id"
            id="emp_id"
            placeholder="Employee ID"
            value={formData.emp_id}
            onChange={handleChange}
          />
          <small>{errors.emp_id}</small>
        </div>

        <div className="form-group">
          <label htmlFor="email_id">Email:</label>
          <input
            type="email"
            name="email_id"
            id="email_id"
            placeholder="Email"
            value={formData.email_id}
            onChange={handleChange}
          />
          <small>{errors.email_id}</small>
        </div>

        <div className="form-group">
          <label htmlFor="phone_no">Phone Number:</label>
          <input
            type="text"
            name="phone_no"
            id="phone_no"
            placeholder="Phone Number"
            value={formData.phone_no}
            onChange={handleChange}
          />
          <small>{errors.phone_no}</small>
        </div>

        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            name="age"
            id="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
          />
          <small>{errors.age}</small>
        </div>

        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            name="dob"
            id="dob"
            value={formData.dob}
            onChange={handleChange}
          />
          <small>{errors.dob}</small>
        </div>

        <div className="form-group">
          <label htmlFor="doj">Date of Joining:</label>
          <input
            type="date"
            name="doj"
            id="doj"
            value={formData.doj}
            onChange={handleChange}
          />
          <small>{errors.doj}</small>
        </div>

        <div className="form-group">
          <label htmlFor="dept">Department:</label>
          <select name="dept" id="dept" value={formData.dept} onChange={handleChange}>
            <option>HR</option>
            <option>PR</option>
            <option>Marketing</option>
            <option>DevOps</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select name="gender" id="gender" value={formData.gender} onChange={handleChange}>
            <option>Male</option>
            <option>Female</option>
            <option>Transgender</option>
            <option>Vavvalunga</option>
            <option>Others</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            name="role"
            id="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleChange}
          />
          <small>{errors.role}</small>
        </div>

        <button type="submit" disabled={formData.age && formData.age < 18}>
          Submit
        </button>

        <button type="reset" onClick={() => setFormData({ ...formData })}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;

import React, { useState } from "react";
import "./App.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setFormData({ username: "", email: "", phone: "", dob: "" });
    setErrors({ username: "", email: "", phone: "", dob: "" });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors({ ...errors, [id]: "" });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { username: "", email: "", phone: "", dob: "" };

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Please fill out this field.";
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Please fill out this field.";
      isValid = false;
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Please include an '@' in the email address.";
      isValid = false;
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Please fill out this field.";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      isValid = false;
    }

    // Date of Birth validation
    if (!formData.dob.trim()) {
      newErrors.dob = "Please fill out this field.";
      isValid = false;
    } else {
      const inputDate = new Date(formData.dob.split("-").reverse().join("-"));
      const today = new Date();

      if (inputDate > today) {
        alert("Invalid date of birth. Date of birth cannot be in the future.");
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Form is valid, proceed with submission
      alert("Form submitted successfully!");
      handleCloseModal();
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>User Details Modal</h1>
        <button className="open-form-btn" onClick={handleOpenModal}>
          Open Form
        </button>
      </div>

      {isModalOpen && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Fill Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
                {errors.username && (
                  <span className="error">{errors.username}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address:</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  pattern="[0-9]{10}"
                />
                {errors.phone && <span className="error">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                />
                {errors.dob && <span className="error">{errors.dob}</span>}
              </div>

              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

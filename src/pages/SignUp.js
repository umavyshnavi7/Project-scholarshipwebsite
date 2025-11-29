import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useFormValidation } from '../hooks/useFormValidation';
import { required, email, minLength, matchField } from '../utils/validationRules';
import Captcha from '../components/Captcha';
import './Auth.css';

function SignUp() {
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const validationRules = {
    name: [required('Name is required'), minLength(2, 'Name must be at least 2 characters')],
    email: [required('Email is required'), email()],
    password: [required('Password is required'), minLength(6, 'Password must be at least 6 characters')],
    confirmPassword: [required('Please confirm password'), matchField('password', 'Passwords do not match')]
  };
  
  const {
    values: formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll
  } = useFormValidation({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  }, validationRules);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleRoleChange = (role) => {
    handleChange('role', role);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateAll()) {
      return;
    }
    
    if (!isCaptchaVerified) {
      return;
    }

    try {
      const user = register(formData);
      navigate(user.role === 'admin' ? '/admin' : '/student');
    } catch (err) {
      // Handle registration error
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create an Account</h2>

        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onBlur={() => handleBlur('name')}
              placeholder="Enter your full name"
              className={errors.name && touched.name ? 'error' : ''}
            />
            {errors.name && touched.name && <span className="field-error">{errors.name}</span>}
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={() => handleBlur('email')}
              placeholder="Enter your email"
              className={errors.email && touched.email ? 'error' : ''}
            />
            {errors.email && touched.email && <span className="field-error">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              onBlur={() => handleBlur('password')}
              placeholder="Enter your password"
              className={errors.password && touched.password ? 'error' : ''}
            />
            {errors.password && touched.password && <span className="field-error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              onBlur={() => handleBlur('confirmPassword')}
              placeholder="Confirm your password"
              className={errors.confirmPassword && touched.confirmPassword ? 'error' : ''}
            />
            {errors.confirmPassword && touched.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
          </div>

          <div className="form-group">
            <label>I am a</label>
            <div className="role-selector">
              <button
                type="button"
                className={`role-btn ${formData.role === 'student' ? 'active' : ''}`}
                onClick={() => handleRoleChange('student')}
              >
                Student
              </button>
              <button
                type="button"
                className={`role-btn ${formData.role === 'admin' ? 'active' : ''}`}
                onClick={() => handleRoleChange('admin')}
              >
                Management
              </button>
            </div>
          </div>

          <Captcha onVerify={setIsCaptchaVerified} />

          <button type="submit" className="auth-submit-btn">
            Sign Up
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;// Make sure this export is at the end
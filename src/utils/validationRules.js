export const required = (message = 'This field is required') => (value) => {
  return !value || value.toString().trim() === '' ? message : '';
};

export const email = (message = 'Please enter a valid email') => (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return value && !emailRegex.test(value) ? message : '';
};

export const minLength = (min, message) => (value) => {
  return value && value.length < min ? message || `Minimum ${min} characters required` : '';
};

export const maxLength = (max, message) => (value) => {
  return value && value.length > max ? message || `Maximum ${max} characters allowed` : '';
};

export const numeric = (message = 'Please enter a valid number') => (value) => {
  return value && isNaN(Number(value)) ? message : '';
};

export const matchField = (fieldName, message) => (value, allValues) => {
  return value !== allValues[fieldName] ? message : '';
};
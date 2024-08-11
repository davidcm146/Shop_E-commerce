// Regex patterns
const fullNameRegex = /^[a-zA-Z\s]{2,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

// Validate full name
export function validateFullName(fullName) {
  if (!fullNameRegex.test(fullName)) {
    return 'Full name must contain at least 2 characters and only letters and spaces are allowed.';
  }
  return '';
}

// Validate email
export function validateEmail(email) {
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address.';
  }
  return '';
}

// Validate password
export function validatePassword(password) {
  if (!passwordRegex.test(password)) {
    return 'Password must be at least 8 characters long and include both letters and numbers.';
  }
  return '';
}

// Validate confirm password
export function validateConfirmPassword(password, confirmPassword) {
  if (password !== confirmPassword) {
    return 'Passwords do not match.';
  }
  return '';
}

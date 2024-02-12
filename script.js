// Get references to form and input fields
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Function to display error message below input field
function showError(input, message) {
  const formControl = input.parentElement; // Get parent element of input
  formControl.className = 'form-control error'; // Apply error class to parent element
  const small = formControl.querySelector('small'); // Find small element within parent
  small.innerText = message; // Set error message text
}

// Function to add success styling to input field
function showSuccess(input) {
  const formControl = input.parentElement; // Get parent element of input
  formControl.className = 'form-control success'; // Apply success class to parent element
}

// Function to validate email format using regular expression
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) { // Check if email format matches regex
    showSuccess(input); // If valid, apply success styling
  } else {
    showError(input, 'Email is not valid'); // If invalid, display error message
  }
}

// Function to check if required fields are not empty
function checkRequired(inputArr) {
  let isRequired = false; // Initialize flag for required fields
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') { // Check if input value is empty
      showError(input, `${getFieldName(input)} is required`); // If empty, display error message
      isRequired = true; // Set flag to true if any required field is empty
    } else {
      showSuccess(input); // If not empty, apply success styling
    }
  });

  return isRequired; // Return flag indicating if any required field is empty
}

// Function to check input length within specified range
function checkLength(input, min, max) {
  if (input.value.length < min) { // Check if input length is less than minimum
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    ); // Display error message if too short
  } else if (input.value.length > max) { // Check if input length is greater than maximum
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    ); // Display error message if too long
  } else {
    showSuccess(input); // If within range, apply success styling
  }
}

// Function to check if passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) { // Check if passwords do not match
    showError(input2, 'Passwords do not match'); // Display error message if passwords do not match
  }
}

// Function to get field name with first letter capitalized
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listener for form submission
form.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent default form submission behavior

  // Check if any required fields are empty
  if (checkRequired([username, email, password, password2])) {
    // If required fields are not empty, validate each field
    checkLength(username, 3, 15); // Validate username length
    checkLength(password, 6, 25); // Validate password length
    checkEmail(email); // Validate email format
    checkPasswordsMatch(password, password2); // Validate password match
  }
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAKctojCJ4kFYjFtN4kHkon9VTvPN0JoC4",
    authDomain: "login-page-554fb.firebaseapp.com",
    projectId: "login-page-554fb",
    storageBucket: "login-page-554fb.appspot.com",
    messagingSenderId: "128929903208",
    appId: "1:128929903208:web:e44b89207ca4c8279081dd",
    measurementId: "G-Z0G8VEY300"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(() => {
        messageDiv.style.opacity = 0;
    }, 5000);
}
// Validate login inputs function
function validateLoginInputs() {
    let isValid = true; // Assume valid initially
    const emailInput = document.getElementById("Login-Email");
    const passwordInput = document.getElementById("Login-password");
    const emailVal = emailInput.value.trim();
    const passwordVal = passwordInput.value.trim();
    // Get error message elements
    const emailError = document.querySelector('.emailError');
    const passwordError = document.querySelector('.passwordError');
    // Email validation
    if (emailVal === '') {
        emailError.textContent = "Email is required";
        isValid = false;
    } else if (!validateEmail(emailVal)) {
        emailError.textContent = "Please check your email";
        isValid = false;
    } else {
        emailError.textContent = ""; // Clear error if valid
    }
    // Password validation
    if (passwordVal === '') {
        passwordError.textContent = "Password is required";
        isValid = false;
    } else if (passwordVal.length < 8) {
        passwordError.textContent = "Password must be at least 8 characters";
        isValid = false;
    } else {
        passwordError.textContent = ""; // Clear error if valid
    }
    return isValid; // Return overall validity
}
// Email validation function
const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simplified email regex
    return emailPattern.test(email);
};
// Event listener for login form submission
const loginForm = document.getElementById("form");
loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission
    if (validateLoginInputs()) {
        const email = document.getElementById("Login-Email").value.trim();
        const password = document.getElementById("Login-password").value.trim();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("success login");
                console.log(userCredential);
                showMessage('Login successful', 'signInMessage');
                const user = userCredential.user;
                localStorage.setItem('loggedInUserId', user.uid);
                window.location.href = './homepage.html';
            })
            .catch((error) => {
                console.log(error);
                const errorCode = error.code;
                if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
                    showMessage('Incorrect email or password', 'signInMessage');
                } else {
                    showMessage('Login failed. Please try again.', 'signInMessage');
                }
            });
    }
});

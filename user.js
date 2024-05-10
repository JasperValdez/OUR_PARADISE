// JavaScript function to go back to the previous page
function goBack() {
    window.history.back();
  }
  
  function setUserIdentifier(username) {
    var userId = "user_" + username; // Creating a unique identifier for the user
    localStorage.setItem("userId", userId); // Store the user identifier in local storage
  }
  // Function to register a new user
  function registerUser() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (username.trim() === "" || password.trim() === "") {
      alert("Username and password cannot be empty!");
      return;
    }
    localStorage.setItem("user_" + username, password); // Store user credentials
    alert("Registration successful!");
  }
  
  // Function to login a user
  function loginUser() {
    var loginUsername = document.getElementById("loginUsername").value;
    var loginPassword = document.getElementById("loginPassword").value;
    var storedPassword = localStorage.getItem("user_" + loginUsername); // Retrieve stored password
    if (storedPassword === loginPassword) {
      alert("Login successful!");
      setUserIdentifier(loginUsername); // Set unique identifier for the logged-in user
      localStorage.setItem("isLoggedIn", "true"); // Set user's login status
      window.location.href = "homepage.html"; // Redirect to shop page after login
    } else {
      alert("Invalid username or password.");
    }
  }
  
  function adminLogin() {
    var adminUsername = "Cycle";
    var adminPassword = "shop";
    var loginUsername = document.getElementById("loginUsername").value;
    var loginPassword = document.getElementById("loginPassword").value;
    if (loginUsername === adminUsername && loginPassword === adminPassword) {
      alert("Admin login successful!");
      window.location.href = "manage.html"; // Change the URL to the desired admin page
    } else {
      alert("Invalid admin credentials.");
    }
  }
  
  

function goBack() {
    window.history.back();
  }
  
  function setUserIdentifier(username) {
    var userId = "user_" + username; 
    localStorage.setItem("userId", userId); 
  }
  // Function to register a new user
  function registerUser() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (username.trim() === "" || password.trim() === "") {
      alert("Username and password cannot be empty!");
      return;
    }
    localStorage.setItem("user_" + username, password); 
    alert("Registration successful!");
  }
  
  // Function to login a user
  function loginUser() {
    var loginUsername = document.getElementById("loginUsername").value;
    var loginPassword = document.getElementById("loginPassword").value;
    var storedPassword = localStorage.getItem("user_" + loginUsername); 
    if (storedPassword === loginPassword) {
      alert("Login successful!");
      setUserIdentifier(loginUsername); 
      localStorage.setItem("isLoggedIn", "true"); 
      window.location.href = "homepage.html"; 
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
      window.location.href = "manage.html"; 
    } else {
      alert("Invalid admin credentials.");
    }
  }
  
  
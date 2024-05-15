// Function to display user information in the modal
function displayUserInfo() {
    var loggedInUser = localStorage.getItem("userId");
    var userInfoBody = document.getElementById("userInfoBody");

    if (loggedInUser) {
        var storedPassword = localStorage.getItem("user_" + loggedInUser);
        userInfoBody.innerHTML = `
            <p>Logged in as: ${loggedInUser}</p>
            <p>Password: ${storedPassword}</p>
        `;
    } else {
        userInfoBody.innerHTML = "<p>No user logged in.</p>";
    }
}

// Call displayUserInfo function initially to populate the modal
displayUserInfo();


function logout() {
    var loggedInUser = localStorage.getItem("userId");

    if (loggedInUser) {
        localStorage.removeItem("userId");
        localStorage.removeItem("isLoggedIn");
        alert("Logged out successfully!");
        window.location.href = "Homepage.html";
    } else {
        alert("No user logged in. Please log in first.");
    }

    displayUserInfo(); // Update user info in modal after logout attempt
}


// Function to login user
function loginUser() {
    var loginUsername = document.getElementById("loginUsername").value;
    var loginPassword = document.getElementById("loginPassword").value;
    var storedPassword = localStorage.getItem("user_" + loginUsername);

    if (storedPassword === loginPassword) {
        alert("Login successful!");
        localStorage.setItem("userId", loginUsername);
        localStorage.setItem("isLoggedIn", "true");
        displayUserInfo(); // Update user info in modal after login
        window.location.href = "homepage.html";
    } else {
        alert("Invalid username or password.");
    }
}

// Function to update username
function updateUsername() {
    var newUsername = prompt("Enter new username:");
    if (newUsername !== null && newUsername.trim() !== "") {
        var oldUsername = localStorage.getItem("userId");
        var storedPassword = localStorage.getItem("user_" + oldUsername);
        
        // Update localStorage
        localStorage.removeItem("user_" + oldUsername);
        localStorage.setItem("user_" + newUsername, storedPassword);
        localStorage.setItem("userId", newUsername);

        alert("Username updated successfully!");
        displayUserInfo(); // Update user info in modal after updating username
    }
}

// Function to update username
function updateUsernameModal() {
    var loggedInUser = localStorage.getItem("userId");
    if (!loggedInUser) {
        alert("No user logged in. Please log in first.");
        return;
    }

    var newUsername = document.getElementById("newUsernameInput").value;
    if (newUsername.trim() === "") {
        alert("Username cannot be empty.");
        return;
    }

    var storedPassword = localStorage.getItem("user_" + loggedInUser);
    
    // Update localStorage
    localStorage.removeItem("user_" + loggedInUser);
    localStorage.setItem("user_" + newUsername, storedPassword);
    localStorage.setItem("userId", newUsername);

    alert("Username updated successfully!");
    displayUserInfo(); // Update user info in modal after updating username
}

// Function to update password
function updatePasswordModal() {
    var loggedInUser = localStorage.getItem("userId");
    if (!loggedInUser) {
        alert("No user logged in. Please log in first.");
        return;
    }

    var newPassword = document.getElementById("newPasswordInput").value;
    if (newPassword.trim() === "") {
        alert("Password cannot be empty.");
        return;
    }

    localStorage.setItem("user_" + loggedInUser, newPassword);
    alert("Password updated successfully!");
    displayUserInfo(); // Update user info in modal after updating password
}

// Function to delete account
function deleteAccount() {
    var loggedInUser = localStorage.getItem("userId");
    if (!loggedInUser) {
        alert("No user logged in. Please log in first.");
        return;
    }

    var confirmDelete = confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
        localStorage.removeItem("user_" + loggedInUser);
        localStorage.removeItem("userId");
        localStorage.removeItem("isLoggedIn");
        alert("Account deleted successfully!");
        window.location.href = "Homepage.html";
    }
}

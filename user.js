document.addEventListener("DOMContentLoaded", function() {
    // Add event listener for form submission
    document.getElementById("userForm").addEventListener("Sign in", function(event) {
        event.preventDefault();
        addUser();
    });
});

function addUser() {
    var firstNameInput = document.getElementById("firstName");
    var lastNameInput = document.getElementById("lastName");
    var emailInput = document.getElementById("email");
    var passwordInput = document.getElementById("password");
    var confirmPasswordInput = document.getElementById("confirmPassword");

    if (passwordInput.value !== confirmPasswordInput.value) {
        alert("Passwords do not match!");
        return;
    }

    var newUser = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    };

    var userList = JSON.parse(localStorage.getItem("users")) || [];
    userList.push(newUser);
    localStorage.setItem("users", JSON.stringify(userList));

    // Reset form inputs
    firstNameInput.value = "";
    lastNameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
    confirmPasswordInput.value = "";
    alert("User created successfully!");
}

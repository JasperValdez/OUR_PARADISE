// Function to go back to the previous page
function goBack() {
  window.history.back();
}

// Function to retrieve user accounts from localStorage
function getUserAccounts() {
  var accounts = [];
  for (var key in localStorage) {
      if (localStorage.hasOwnProperty(key) && key !== "length" && key.startsWith("user_")) {
          accounts.push({ username: key.substring(5), password: localStorage.getItem(key) });
      }
  }
  return accounts;
}

// Function to display user accounts on the page
function displayUserAccounts() {
  var accountList = document.getElementById("accountList");
  accountList.innerHTML = ""; // Clear previous accounts

  // Loop through localStorage to get user accounts with "user_" prefix
  var accounts = getUserAccounts();
  accounts.forEach(function(account) {
      var accountItem = document.createElement("div");
      accountItem.classList.add("account-item");
      accountItem.innerHTML = `
      <div>${account.username}</div>
      <button onclick="updateAccount('${account.username}')">Update</button>
      <button onclick="deleteAccount('${account.username}')">Delete</button>
    `;
      accountList.appendChild(accountItem);
  });
}

// Function to update a user account
function updateAccount(username) {
  var newPassword = prompt("Enter new password for " + username + ":");
  if (newPassword) {
      localStorage.setItem("user_" + username, newPassword);
      alert("Account updated successfully!");
      displayUserAccounts();
  }
}

// Function to delete a user account
function deleteAccount(username) {
  var confirmDelete = confirm("Are you sure you want to delete the account for " + username + "?");
  if (confirmDelete) {
      // Remove user account data
      localStorage.removeItem("user_" + username);
      // Remove user's cart data
      deleteUserCart(username);
      alert("Account deleted successfully!");
      // Update cart data for all users
      updateAllUserCartData();
      displayUserAccounts();
  }
}

// Function to delete the cart of a specific user
function deleteUserCart(username) {
  var cartKey = "cart_" + username;
  localStorage.removeItem(cartKey);
}

// Function to update cart data for all users after an account is deleted
function updateAllUserCartData() {
  var accounts = getUserAccounts();
  accounts.forEach(function(account) {
      deleteUserCart(account.username);
  });
}


// Call function to display user accounts when the page loads
displayUserAccounts();

// Function to navigate back to the previous page
function goBack() {
  window.history.back();
}

// Function to display products
function displayProducts() {
  var productList = document.getElementById("productList");
  productList.innerHTML = ""; // Clear previous products

  // Loop through localStorage to get product data
  for (var key in localStorage) {
      if (localStorage.hasOwnProperty(key) && key !== "length" && !key.startsWith("user_")) {
          try {
              // Skip parsing if key is "userId"
              if (key === "userId") continue;

              var productData = JSON.parse(localStorage.getItem(key));
              // Check if the parsed data is an object (JSON)
              if (typeof productData === "object" && productData !== null) {
                  var productItem = document.createElement("div");
                  productItem.classList.add("product-item");
                  productItem.innerHTML = `
            <div class="product-name">${productData.name}</div>
            <img src="${productData.image}" alt="${productData.name}">
            <p>Price: $${productData.price}</p>
            <!-- Display product data only if it's not user account data -->
            ${(productData.hasOwnProperty('name') && productData.hasOwnProperty('image') && productData.hasOwnProperty('price')) ?
                      `<button onclick="addToCart('${key}')">Add to Cart</button>` : ''}
          `;
                  productList.appendChild(productItem);
              }
          } catch (error) {
              console.error("Error parsing JSON for key:", key, error);
          }
      }
  }
}

// Function to add a product to the cart
function addToCart(key) {
  var isLoggedIn = localStorage.getItem("isLoggedIn"); // Check if user is logged in
  var userId = localStorage.getItem("userId"); // Get the user's identifier

  // Check if the user is logged in and has a valid user identifier
  if (isLoggedIn === "true" && userId) {
      var productData = JSON.parse(localStorage.getItem(key));
      var cartKey = "cart_" + userId; // Key for the user's cart data
      var cart = JSON.parse(localStorage.getItem(cartKey)) || {}; // Get the user's cart data
      cart[key] = cart[key] ? cart[key] + 1 : 1; // Add the product to the cart
      localStorage.setItem(cartKey, JSON.stringify(cart)); // Save the updated cart data
      updateCart(); // Update the cart display
  } else {
      alert("Please log in to add items to your cart.");
      window.location.href = "user.html"; // Redirect to the login page
  }
}

// Function to update the cart display
function updateCart() {
  var cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "<tr><th>Product Name</th><th>Price</th><th>Quantity</th><th></th></tr>";
  var totalPrice = 0;
  var userId = localStorage.getItem("userId"); // Get the user's identifier
  var cartKey = "cart_" + userId; // Key for the user's cart data
  var cart = JSON.parse(localStorage.getItem(cartKey)) || {}; // Get the user's cart data

  // Loop through the user's cart data
  for (var key in cart) {
      if (cart.hasOwnProperty(key)) {
          var productData = JSON.parse(localStorage.getItem(key));
          var price = parseFloat(productData.price);
          var quantity = cart[key];
          var totalPriceForProduct = price * quantity;

          cartItems.innerHTML += `
            <tr>
                <td>${productData.name}</td>
                <td>$${price}</td>
                <td>
                    <button onclick="decreaseQuantity('${key}')">-</button>
                    ${quantity}
                    <button onclick="increaseQuantity('${key}')">+</button>
                </td>
                <td><button onclick="removeFromCart('${key}')">Remove</button></td>
            </tr>
        `;
          totalPrice += totalPriceForProduct;
      }
  }

  document.getElementById("totalPrice").textContent = `$${totalPrice.toFixed(2)}`;
}

// Function to increase the quantity of a product
function increaseQuantity(key) {
  var isLoggedIn = localStorage.getItem("isLoggedIn");
  var userId = localStorage.getItem("userId");
  if (isLoggedIn === "true" && userId) {
      var cartKey = "cart_" + userId;
      var cart = JSON.parse(localStorage.getItem(cartKey)) || {};
      if (cart[key]) {
          cart[key]++;
          localStorage.setItem(cartKey, JSON.stringify(cart));
          updateCart();
      }
  }
}

// Function to decrease the quantity of a product
function decreaseQuantity(key) {
  var isLoggedIn = localStorage.getItem("isLoggedIn");
  var userId = localStorage.getItem("userId");
  if (isLoggedIn === "true" && userId) {
      var cartKey = "cart_" + userId;
      var cart = JSON.parse(localStorage.getItem(cartKey)) || {};
      if (cart[key] && cart[key] > 0) {
          cart[key]--;
          if (cart[key] === 0) {
              delete cart[key];
          }
          localStorage.setItem(cartKey, JSON.stringify(cart));
          updateCart();
      }
  }
}

// Function to remove a product from the cart
function removeFromCart(key) {
  var isLoggedIn = localStorage.getItem("isLoggedIn");
  var userId = localStorage.getItem("userId");
  if (isLoggedIn === "true" && userId) {
      var cartKey = "cart_" + userId;
      var cart = JSON.parse(localStorage.getItem(cartKey)) || {};
      delete cart[key];
      localStorage.setItem(cartKey, JSON.stringify(cart));
      updateCart();
  }
}

// Function to checkout
function checkout() {
  var isLoggedIn = localStorage.getItem("isLoggedIn");
  var userId = localStorage.getItem("userId");
  if (isLoggedIn === "true" && userId) {
      var cartKey = "cart_" + userId;
      localStorage.removeItem(cartKey);
      updateCart();
      document.getElementById("checkoutMessage").style.display = "block";
      setTimeout(function () {
          document.getElementById("checkoutMessage").style.display = "none";
      }, 2000);
  } else {
      alert("Please log in to proceed with checkout.");
      window.location.href = "user.html";
  }
}

// Call function to display products when the page loads
displayProducts();
updateCart(); // Update cart on page load


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
  
function addToCart(key) {
    var isLoggedIn = localStorage.getItem("isLoggedIn"); // Check if user is logged in
    if (isLoggedIn === "true") {
        var productData = JSON.parse(localStorage.getItem(key));
        var cart = JSON.parse(localStorage.getItem("cart")) || {};
        cart[key] = cart[key] ? cart[key] + 1 : 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
    } else {
        alert("Please log in to add items to your cart.");
        window.location.href = "user.html"; // Redirect to login page
    }
}

  // Function to update the cart
  function updateCart() {
    var cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = "<tr><th>Product Name</th><th>Price</th><th>Quantity</th><th></th></tr>";
    var totalPrice = 0;

    var cart = JSON.parse(localStorage.getItem("cart")) || {};
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
    var cart = JSON.parse(localStorage.getItem("cart")) || {};
    cart[key] = cart[key] ? cart[key] + 1 : 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
  }

  // Function to decrease the quantity of a product
  function decreaseQuantity(key) {
    var cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (cart[key] && cart[key] > 0) {
      cart[key] -= 1;
      if (cart[key] === 0) {
        delete cart[key];
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCart();
    }
  }

  // Function to remove a product from the cart
  function removeFromCart(key) {
    var cart = JSON.parse(localStorage.getItem("cart")) || {};
    delete cart[key];
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
  }

  // Function to checkout
  function checkout() {
    localStorage.removeItem("cart");
    updateCart();
    document.getElementById("checkoutMessage").style.display = "block";
    setTimeout(function() {
      document.getElementById("checkoutMessage").style.display = "none";
    }, 2000); // Hide message after 2 seconds
  }

  // Call function to display products when the page loads
  displayProducts();
  updateCart(); // Update cart on page load

     // Function to checkout
function checkout() {
  var cart = JSON.parse(localStorage.getItem("cart")) || {};

  // Check if the cart is empty
  if (Object.keys(cart).length === 0) {
    alert("Your cart is empty. Please add items to your cart before checkout.");
    return;
  }

  // Proceed with checkout if cart is not empty
  localStorage.removeItem("cart");
  updateCart();
  document.getElementById("checkoutMessage").style.display = "block";
  setTimeout(function() {
    document.getElementById("checkoutMessage").style.display = "none";
  }, 2000); // Hide message after 2 seconds
}

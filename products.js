function goBack() {
    window.history.back();
}

function displayProducts() {
    var isLoggedIn = localStorage.getItem("isLoggedIn");
    var userId = localStorage.getItem("userId");

    if (isLoggedIn === "true" && userId) {
        document.getElementById("loginPrompt").style.display = "none";
        document.getElementById("productList").style.display = "block";

        var productList = document.getElementById("productList");
        productList.innerHTML = "";

        for (var key in localStorage) {
            if (localStorage.hasOwnProperty(key) && key !== "length" && key !== "userId" && key !== "isLoggedIn" && !key.startsWith("user_") && !key.startsWith("cart_")) {
                try {
                    var productData = JSON.parse(localStorage.getItem(key));

                    if (typeof productData === "object" && productData !== null && productData.hasOwnProperty("name") && productData.hasOwnProperty("price") && productData.hasOwnProperty("description") && productData.hasOwnProperty("image")) {
                        var productItem = document.createElement("div");
                        productItem.classList.add("product-item");

                        var img = document.createElement("img");
                        img.src = productData.image;
                        img.alt = productData.name;

                        // Use IIFE to capture the correct product data
                        (function(name, price, description) {
                            img.onclick = function() {
                                openModal(name, price, description);
                            };
                        })(productData.name, productData.price, productData.description);

                        var productName = document.createElement("div");
                        productName.textContent = productData.name;
                        var productPrice = document.createElement("div");
                        productPrice.textContent = "$" + productData.price;

                        var addToCartButton = document.createElement("button");
                        addToCartButton.textContent = "Add to Cart";
                        addToCartButton.onclick = (function(key) {
                            return function() {
                                addToCart(key);
                            };
                        })(key);

                        productItem.appendChild(img);
                        productItem.appendChild(productName);
                        productItem.appendChild(productPrice);
                        productItem.appendChild(addToCartButton);
                        productList.appendChild(productItem);
                    } else {
                        console.error("Invalid product data for key:", key);
                        localStorage.removeItem(key);
                    }
                } catch (error) {
                    console.error("Error parsing JSON for key:", key, error);
                    localStorage.removeItem(key);
                }
            }
        }
    } else {
        document.getElementById("loginPrompt").style.display = "block";
        document.getElementById("productList").style.display = "none";
    }
}


function openModal(name, price, description) {
    var modal = document.getElementById("productModal");
    var modalDescription = document.getElementById("modalDescription");

    modal.style.display = "block";
    modalDescription.textContent = description;
}

function closeModal() {
    var modal = document.getElementById("productModal");
    modal.style.display = "none";
}

function addToCart(key) {
    var isLoggedIn = localStorage.getItem("isLoggedIn"); 
    var userId = localStorage.getItem("userId"); 

    if (isLoggedIn === "true" && userId) {
        var productData = JSON.parse(localStorage.getItem(key));
        var cartKey = "cart_" + userId; 
        var cart = JSON.parse(localStorage.getItem(cartKey)) || {}; 
        cart[key] = cart[key] ? cart[key] + 1 : 1; 
        localStorage.setItem(cartKey, JSON.stringify(cart)); 
        updateCart(); 
    }
}

function updateCart() {
    var cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = "<tr><th>Product Name</th><th>Price</th><th>Quantity</th><th></th></tr>";
    var totalPrice = 0;
    var userId = localStorage.getItem("userId"); 
    var cartKey = "cart_" + userId; 
    var cart = JSON.parse(localStorage.getItem(cartKey)) || {}; 

    for (var key in cart) {
        if (cart.hasOwnProperty(key)) {
            var productData = JSON.parse(localStorage.getItem(key));
            if (productData && typeof productData === "object" && productData.hasOwnProperty("name") && productData.hasOwnProperty("price")) {
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
            } else {
                console.error("Invalid product data for key:", key);
                delete cart[key];
                localStorage.setItem(cartKey, JSON.stringify(cart));
            }
        }
    }

    document.getElementById("totalPrice").textContent = `$${totalPrice.toFixed(2)}`;
}

function increaseQuantity(key) {
    var userId = localStorage.getItem("userId");
    if (userId) {
        var cartKey = "cart_" + userId;
        var cart = JSON.parse(localStorage.getItem(cartKey)) || {};
        if (cart[key]) {
            cart[key]++;
            localStorage.setItem(cartKey, JSON.stringify(cart));
            updateCart();
        }
    }
}

function decreaseQuantity(key) {
    var userId = localStorage.getItem("userId");
    if (userId) {
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

function removeFromCart(key) {
    var userId = localStorage.getItem("userId");
    if (userId) {
        var cartKey = "cart_" + userId;
        var cart = JSON.parse(localStorage.getItem(cartKey)) || {};
        delete cart[key];
        localStorage.setItem(cartKey, JSON.stringify(cart));
        updateCart();
    }
}

function checkout() {
    var userId = localStorage.getItem("userId");
    if (userId) {
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
updateCart();

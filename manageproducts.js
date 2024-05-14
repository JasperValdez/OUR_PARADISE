document.getElementById("productForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the default form submission
  var productName = document.getElementById("productName").value;
  var productPrice = document.getElementById("productPrice").value;
  var productDescription = document.getElementById("productDescription").value;
  var productImage = document.getElementById("productImage").files[0];

  // Convert image to base64 format
  var reader = new FileReader();
  reader.onload = function(e) {
    var productData = {
      name: productName,
      price: productPrice,
      description: productDescription,
      image: e.target.result // Image data in base64 format
    };
    // Save product data to localStorage
    localStorage.setItem("product_" + productName, JSON.stringify(productData));
    alert("Product created successfully!");
    displayProducts(); // Refresh the product list
  };
  reader.readAsDataURL(productImage); // Read the uploaded image as data URL
});

function displayProducts() {
  var productList = document.getElementById("productList");
  productList.innerHTML = ""; 

  // Loop through localStorage to get product data
  for (var key in localStorage) {
    if (localStorage.hasOwnProperty(key) && key.startsWith("product_")) {
      var productData = JSON.parse(localStorage.getItem(key));
      var productItem = document.createElement("div");
      productItem.classList.add("product-item");
      productItem.innerHTML = `
        <img src="${productData.image}" alt="${productData.name}" onclick="changeImage('${key}')"> <!-- Add onclick event to change image -->
        <div>
          <p>${productData.name}</p>
          <p>$${productData.price}</p>
          <p>${productData.description}</p>
        </div>
        <div class="btn-group">
          <button onclick="showUpdateModal('${key}', '${productData.name}', '${productData.price}', '${productData.description}')">Update</button>
          <button onclick="deleteProduct('${key}')">Delete</button>
        </div>
      `;
      productList.appendChild(productItem);
    }
  }
}

function changeImage(key) {
  document.getElementById("productImage").click(); 
  document.getElementById("productImage").addEventListener("change", function() {
    var newImage = this.files[0];
    if (newImage) {
      var reader = new FileReader();
      reader.onload = function(e) {
        var productData = JSON.parse(localStorage.getItem(key));
        productData.image = e.target.result; 
        localStorage.setItem(key, JSON.stringify(productData));
        displayProducts();
      };
      reader.readAsDataURL(newImage);
    }
  });
}

// Show update modal with current product details
function showUpdateModal(key, oldName, oldPrice, oldDescription) {
  document.getElementById("updateProductName").value = oldName;
  document.getElementById("updateProductPrice").value = oldPrice;
  document.getElementById("updateProductDescription").value = oldDescription;
  document.getElementById("updateForm").onsubmit = function(event) {
    event.preventDefault();
    updateProduct(key);
  };
  document.getElementById("updateModal").style.display = "block";
}

// Update product with new details from modal
function updateProduct(key) {
  var newName = document.getElementById("updateProductName").value;
  var newPrice = document.getElementById("updateProductPrice").value;
  var newDescription = document.getElementById("updateProductDescription").value;
  if (newName && newPrice && newDescription) {
    var productData = JSON.parse(localStorage.getItem(key));
    productData.name = newName;
    productData.price = newPrice;
    productData.description = newDescription;
    localStorage.setItem(key, JSON.stringify(productData));
    closeModal();
    displayProducts();
  }
}

// Close the modal
function closeModal() {
  document.getElementById("updateModal").style.display = "none";
}

function deleteProduct(key) {
  var confirmDelete = confirm('Are you sure you want to delete this product?');
  if (confirmDelete) {
    localStorage.removeItem(key);
    displayProducts();
  }
}

function goBack() {
  window.history.back();
}

displayProducts();

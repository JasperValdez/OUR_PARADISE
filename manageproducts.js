document.getElementById("productForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var productName = document.getElementById("productName").value;
    var productPrice = document.getElementById("productPrice").value;
    var productImage = document.getElementById("productImage").files[0];
    
    // Convert image 
    var reader = new FileReader();
    reader.onload = function(e) {
      var productData = {
        name: productName,
        price: productPrice,
        image: e.target.result 
      };
      // Save product data to localStorage
      localStorage.setItem("product_" + productName, JSON.stringify(productData));
      alert("Product created successfully!");
      displayProducts(); 
    };
    reader.readAsDataURL(productImage);
  });
  
  // Function to display products
  function displayProducts() {
    var productList = document.getElementById("productList");
    productList.innerHTML = ""; 
  
    // Loop through localStorage to get product data
    for (var key in localStorage) {
      if (localStorage.hasOwnProperty(key) && key !== "length" && key.startsWith("product_")) {
        var productData = JSON.parse(localStorage.getItem(key));
        var productItem = document.createElement("div");
        productItem.classList.add("product-item");
        productItem.innerHTML = `
          <img src="${productData.image}" alt="${productData.name}" onclick="changeImage('${key}')"> <!-- Add onclick event to change image -->
          <p>${productData.name}</p>
          <p>$${productData.price}</p>
          <div class="btn-group">
            <button onclick="updateProduct('${key}', '${productData.name}', '${productData.price}')">Update</button>
            <button onclick="deleteProduct('${key}')">Delete</button>
          </div>
        `;
        productList.appendChild(productItem);
      }
    }
  }
  
  // Function to change product image
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
  
  // Function to update a product
  function updateProduct(key, oldName, oldPrice) {
    var newName = prompt('Enter new name for the product:', oldName);
    var newPrice = prompt('Enter new price for the product:', oldPrice);
    if (newName && newPrice) {
      var productData = JSON.parse(localStorage.getItem(key));
      productData.name = newName;
      productData.price = newPrice;
      localStorage.setItem(key, JSON.stringify(productData));
      displayProducts();
    }
  }
  
  // Function to delete a product
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
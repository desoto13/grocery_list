var str_cart = localStorage.getItem("cart");
var cart_storage = JSON.parse(str_cart);

//Display items in cart
function cart_items() {
  let tableBody = document.getElementById("tablecontent");
  if(str_cart !== null) {
    for(let i = 0; i < cart_storage.length; i++) {
      let tableRow = document.createElement("tr");
      tableBody.appendChild(tableRow);
      
      let productCell = document.createElement("td");
      productCell.innerHTML = cart_storage[i]['display_name'];
      tableRow.appendChild(productCell);
  
      let priceCell = document.createElement("td");
      priceCell.innerHTML = cart_storage[i]['price'];
      tableRow.appendChild(priceCell);
  
      let brandCell = document.createElement("td");
      brandCell.innerHTML = cart_storage[i]['brand'];
      tableRow.appendChild(brandCell);
  
      let categoryCell = document.createElement("td");
      categoryCell.innerHTML = cart_storage[i]['category'];
      tableRow.appendChild(categoryCell);
  
      let removeFrCart = document.createElement("td");
      removeFrCart.innerText = "Remove from Cart";
      removeFrCart.classList.add("rembtn");
      tableRow.appendChild(removeFrCart);
  
      removeFrCart.addEventListener("click", function() {
        let item = cart_storage.find(product => product.display_name === this.parentElement.firstChild.innerHTML);
        cart_storage.splice(cart_storage.indexOf(item),1);
        let string_cart = JSON.stringify(cart_storage);
        localStorage.setItem("cart", string_cart);
        alert("Successfully removed from Cart!");
        location.reload();
      });
    }
  }
  
}

cart_items();

//Growsari List Button
var list = document.getElementById("list");

list.addEventListener("click", function() {
  location.replace("products.html");
});
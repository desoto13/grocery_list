var data;

// Parsing the CSV file to JSON
Papa.parse('Products.csv', {
  header: true,
  download: true,
  dynamicTyping: true,
  complete: function(results) {
    data = results.data;
    let str_data = JSON.stringify(data);
    localStorage.setItem("Products", str_data);
    list_products(data);
  }
});

//Showing the whole list in the products page
function list_products(list) {
  let tableBody = document.getElementById("tablecontent");

  for(let i = 0; i < list.length; i++) {
    let tableRow = document.createElement("tr");
    tableBody.appendChild(tableRow);
    let str_cart = localStorage.getItem("cart");
    for(let val of Object.keys(list[i])){
      if(str_cart !== null){
        let cart_storage = JSON.parse(str_cart);
        let item = cart_storage.find(product => product.id === list[i].id);
        if(typeof(item) === 'object') {
          continue;
        }
        let tableCell = document.createElement("td");
        tableCell.innerHTML = list[i][val];
        tableRow.appendChild(tableCell);
      } else {
        let tableCell = document.createElement("td");
        tableCell.innerHTML = list[i][val];
        tableRow.appendChild(tableCell);
      } 
    }

    //Add to cart button
    if(str_cart !== null){
      let cart_storage = JSON.parse(str_cart);
      let item = cart_storage.find(product => product.id === list[i].id);
      if(typeof(item) === 'object') {
        continue;
      }
      var add2cart = document.createElement("td");
      add2cart.innerText = "Add to Cart";
      add2cart.classList.add("addbtn");
      tableRow.appendChild(add2cart);
    } else {
      var add2cart = document.createElement("td");
      add2cart.innerText = "Add to Cart";
      add2cart.classList.add("addbtn");
      tableRow.appendChild(add2cart);
    } 

    add2cart.addEventListener("click", function() {
      let string_cart = localStorage.getItem("cart");
      if(string_cart !== null) {
        var cart_storage = JSON.parse(string_cart);
      } else {
        var cart_storage = [];
      }
      let item = list.find(product => product.id === parseInt(this.parentElement.firstChild.innerHTML));
      cart_storage.unshift(item)
      let str_cart = JSON.stringify(cart_storage);
      localStorage.setItem("cart", str_cart);
      alert("Successfully added to Cart!");
      location.reload();
    });

  }
}

//View Cart Button
var view = document.getElementById("view");

view.addEventListener("click", function() {
  location.replace("cart.html");
});

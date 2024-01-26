let form_product = document.getElementById("product_form")
let form_customer = document.getElementById("customer_form")
let product_array = []
let customer_array = []
let product_count = 0
let customer_count = 0


function products() {
    document.getElementById("product_div").style.display = "flex"
}
function product_close() {
    document.getElementById("product_div").style.display = "none"

}

function customers() {
    document.getElementById("customer_div").style.display = "flex"
}

function customer_close() {
    document.getElementById("customer_div").style.display = "none"

}



function invoice() {
    document.getElementById("invoice_div").style.display = "flex"
}

function invoice_close() {
    document.getElementById("invoice_div").style.display = "none"

}


function add_product() {
    let product_name = document.getElementById("product_name").value
    let product_price = document.getElementById("product_price").value
    form_product.reset();
    let products = {
        Product_name: `${product_name}`,
        Product_price: `${product_price}`
    }

    product_array.push(products)

    let array_product_name = product_array[product_count].Product_name
    let array_product_price = product_array[product_count].Product_price

    console.log(product_array);

    let row = document.createElement("tr")
    row.innerHTML = ` 
    <th scope="row">${product_count + 1}</th>
    <td>${array_product_name}</td>
    <td>${array_product_price}</td>`

    document.getElementById("product_table_body").appendChild(row)

    document.getElementById("total_count_product").innerHTML = `${product_count + 1}`

    product_count++
}




function add_customer() {

    let customer_name = document.getElementById("customer_name").value
    // let product_price = document.getElementById("product_price").value
    form_customer.reset();
    let customer = {
        customer_name: `${customer_name}`,
    }

    customer_array.push(customer)

    let array_customer_name = customer_array[customer_count].customer_name
    // let array_product_price = product_array[product_count].Product_price

    console.log(customer_array);

    let row = document.createElement("tr")
    row.innerHTML = ` 
    <th scope="row">${customer_count + 1}</th>
    <td>${array_customer_name}</td>
    `
    // <td>${array_product_price}</td>`

    document.getElementById("customer_table_body").appendChild(row)

    document.getElementById("total_count_customer").innerHTML = `${customer_count + 1}`

    customer_count++
}


















document.addEventListener("DOMContentLoaded", function() {
    var searchInput = document.getElementById("search-input");
    var suggestionsContainer = document.getElementById("suggestions-container");
    var searchButton = document.getElementById("search-button");

    var suggestions = ["Apple", "Banana", "Orange", "Mango", "Grapes"];

    searchInput.addEventListener("input", function() {
      var inputValue = searchInput.value.toLowerCase();
      showSuggestions(getMatchingSuggestions(inputValue));
    });

    searchButton.addEventListener("click", function() {
      // Handle search button click action here
      alert("Perform search for: " + searchInput.value);
    });

    document.addEventListener("click", function(event) {
      if (!event.target.closest(".input-group")) {
        suggestionsContainer.style.display = "none";
      }
    });

    function getMatchingSuggestions(inputValue) {
      return suggestions.filter(function(suggestion) {
        return suggestion.toLowerCase().includes(inputValue);
      });
    }

    function showSuggestions(matchingSuggestions) {
      if (matchingSuggestions.length > 0) {
        suggestionsContainer.innerHTML = "";
        matchingSuggestions.forEach(function(suggestion) {
          var suggestionElement = document.createElement("div");
          suggestionElement.classList.add("suggestion", "border-bottom", "p-2");
          suggestionElement.textContent = suggestion;

          suggestionElement.addEventListener("click", function() {
            searchInput.value = suggestion;
            suggestionsContainer.style.display = "none";
          });

          suggestionsContainer.appendChild(suggestionElement);
        });

        suggestionsContainer.style.display = "block";
      } else {
        suggestionsContainer.style.display = "none";
      }
    }
  });




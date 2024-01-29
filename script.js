let form_product = document.getElementById("product_form")
let form_customer = document.getElementById("customer_form")
let product_array = []
let customer_array = []
let product_count = 0
let customer_count = 0


function products() {
    document.getElementById("product_div").style.display = "flex"
    document.getElementsByClassName("wrap_div")[0].style.display = "none"
    document.getElementsByClassName("wrap_div")[1].style.display = "none"
}
function product_close() {
    document.getElementById("product_div").style.display = "none"
    document.getElementsByClassName("wrap_div")[0].style.display = "flex"
    document.getElementsByClassName("wrap_div")[1].style.display = "flex"

}

function customers() {
    document.getElementById("customer_div").style.display = "flex"
    document.getElementsByClassName("wrap_div")[0].style.display = "none"
    document.getElementsByClassName("wrap_div")[1].style.display = "none"
}

function customer_close() {
    document.getElementById("customer_div").style.display = "none"
    document.getElementsByClassName("wrap_div")[0].style.display = "flex"
    document.getElementsByClassName("wrap_div")[1].style.display = "flex"

}



function invoice() {
    invoice_data_pass()
    document.getElementById("invoice_div").style.display = "flex"
    document.getElementsByClassName("wrap_div")[0].style.display = "none"
    document.getElementsByClassName("wrap_div")[1].style.display = "none"

    
}

function invoice_close() {
    document.getElementById("invoice_div").style.display = "none"
    document.getElementsByClassName("wrap_div")[0].style.display = "flex"
    document.getElementsByClassName("wrap_div")[1].style.display = "flex"

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

    


    // let invoice_count = 0
    for (let i = product_count; i < product_array.length; i++) {
        console.log(product_array[i]);
        let product = product_array[i].Product_name
        let child =  document.createElement("option")
        child.id = "select_option"
        child.innerHTML =     ` 
        <option >${product}</option>
        `
        document.getElementById("invoice_select_box").appendChild(child)
      

    }
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


function invoice_data_pass() {

}



function handleclick(){
    var selectedValue = document.getElementById("invoice_select_box").value;
    console.log("Selected value: " + selectedValue);    
}
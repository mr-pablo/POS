let form_product = document.getElementById("product_form")
let form_customer = document.getElementById("customer_form")
let product_array = []
let customer_array = []
let order_array = []
let table_row_array = []
let product_count = 0
let customer_count = 0
let invoice_count = 0


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
        Product_price: `${product_price}`,
        id: `${product_count}`
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
        let child = document.createElement("option")
        child.id = "select_option"
        child.innerHTML = ` 
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


    for (let i = customer_count; i < customer_array.length; i++) {
        console.log(customer_array[i]);
        let customer = customer_array[i].customer_name
        let child = document.createElement("option")
        child.id = "select_option"
        child.innerHTML = ` 
        <option >${customer}</option>
        `
        document.getElementById("invoice_select_box_customer").appendChild(child)

    }

    customer_count++
}


function invoice_data_pass() {

}


 
function select_product() {
    var selectedproduct = document.getElementById("invoice_select_box").value;
    // console.log("Selected value: " + selectedproduct);    
    var product_index = product_array.findIndex(product => product.Product_name === selectedproduct);

    console.log("product--index =",product_index);
    let push_element = product_array[product_index]
    order_array.push(push_element)
    Order_array(product_index)

}
let num = 0
function Order_array(index) {

    console.log(order_array);
    let product_name = order_array[num].Product_name
    let product_price = order_array[num].Product_price



    let row = document.createElement("tr")
    row.innerHTML = ` 
    <td ><i id="delete_button" onclick="delete_row(this)" class="bi bi-x-circle-fill"></i></td> 
    <th scope="row" class="nums">${num + 1}</th>
    <td>${product_name}</td>
    <td><input id="price_input" type="number" value="${product_price}" oninput="price_change(this)"></td>
    <td><input id="quantity_input" type="number" value="1"  oninput="quantity_change(this)"></td>
    <td id="total" class="totals">${product_price}</td> 
    `



    document.getElementById("reciept_table_body").appendChild(row)
    total_amount_calc() 
    arrange_num()
    
    num++
}

let get_quantity = 0
let get_price = 0
function quantity_change(element) { 
    let quantity = element.value
    let row = element.parentNode.parentNode;
    let price_element = row.querySelector('#price_input');
    let price = price_element.value
    let total_amount = quantity * price
    let total_elemet = row.querySelector('#total');
    total_elemet.innerHTML = `${total_amount}`

    total_amount_calc()
}

function price_change(element_price) {
    let price = element_price.value
    let row = element_price.parentNode.parentNode;
    let quantity_element = row.querySelector('#quantity_input');
    let quantity = quantity_element.value
    let total_amount = quantity * price
    let total_elemet = row.querySelector('#total');
    total_elemet.innerHTML = `${total_amount}`


    total_amount_calc()

}

function delete_row(element) {
    let row = element.parentNode.parentNode
    row.parentNode.removeChild(row);
    total_amount_calc()
    arrange_num()
}

function total_amount_calc() {
    let totals = document.getElementsByClassName("totals")
    let add = 0
    for (let i = 0; i < totals.length; i++) {
        let value = totals[i].innerHTML
        value = parseInt(value)
        add = add + value
        document.getElementById("reciept_total_amount").innerHTML = `${add}`
        console.log("total-price = ",add);

    }
}

function arrange_num(){
    let num_elements = document.getElementsByClassName("nums")
    for(let i=0 ;i<num_elements.length;i++){
        num_elements[i].innerHTML = i + 1
    }
}



// import * as html2pdf from 'html2pdf.js';

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

// function add_product() {

let myForm = document.getElementById("product_form")

myForm.addEventListener("submit", function (event) {
    event.preventDefault();
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
});

// }




let costomerForm = document.getElementById("customer_form")


costomerForm.addEventListener("submit", function (event) {
    event.preventDefault();

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

});



function invoice_data_pass() {

}



function select_product() {
    var selectedproduct = document.getElementById("invoice_select_box").value;
    // console.log("Selected value: " + selectedproduct);    
    var product_index = product_array.findIndex(product => product.Product_name === selectedproduct);

    // console.log("product--index =", product_index);
    let push_element = product_array[product_index]

    let ordered_index = order_array.findIndex(product => product.Product_name === selectedproduct)
    console.log("that fucking index is ", ordered_index);
    if (ordered_index >= 0) {
        let quantity_elements = document.getElementsByClassName("quantity")
        let selected_elemet = quantity_elements[ordered_index]

        let present_quantity = selected_elemet.value
        //   console.log("blabala = ",present_quantity );
        present_quantity = parseInt(present_quantity, 10)
        present_quantity = present_quantity + 1

        selected_elemet.value = present_quantity
        total_amount_calc()
        quantity_change(selected_elemet)
        document.getElementById("invoice_select_box").selectedIndex = 0

    } else {
        console.log("not in array");
        order_array.push(push_element)
        Order_array(selectedproduct)
    }



}
let num = 0
function Order_array(selectedproduct) {


    var product_index = product_array.findIndex(product => product.Product_name === selectedproduct);
    let object = product_array[product_index]



    console.log(order_array);
    let product_name = object.Product_name
    let product_price = object.Product_price



    let row = document.createElement("tr")
    row.className = "table_rows"
    row.innerHTML = ` 
    <td ><i id="delete_button" onclick="delete_row(this)" class="bi bi-trash-fill"></i></td> 
    <th scope="row" class="nums">${num + 1}</th>
    <td id = "product_name">${product_name}</td>
    <td><input id="price_input" class="prices" type="number" value="${product_price}" onchange="price_change(this)"></td>
    <td><input id="quantity_input" class="quantity" type="number" value="1"  onchange="quantity_change(this)"></td>
    <td id="total" class="totals">${product_price}</td> 
    `



    document.getElementById("reciept_table_body").appendChild(row)
    document.getElementById("invoice_select_box").selectedIndex = 0
    total_amount_calc()
    arrange_num()

    num++
}

let get_quantity = 0
let get_price = 0
function quantity_change(element) {
    let quantity = element.value


    if (quantity <= 0) {
        element.value = 1
        total_elemet.innerHTML = `${price}`
    }
    let row = element.parentNode.parentNode;
    let total_elemet = row.querySelector('#total');
    let price_element = row.querySelector('#price_input');
    let price = price_element.value
    let total_amount = quantity * price
    total_elemet.innerHTML = `${total_amount}`

    total_amount_calc()
}

function price_change(element_price) {

    let price = element_price.value
    let row = element_price.parentNode.parentNode;
    let total_elemet = row.querySelector('#total');
    if (price < 1) {
        element_price.value = 1
        let added_total = quantity * 1
        total_elemet.innerHTML = `${added_total}`
        // total_amount_calc()
    }


    let quantity_element = row.querySelector('#quantity_input');
    let quantity = quantity_element.value
    let total_amount = quantity * price

    total_elemet.innerHTML = `${total_amount}`


    total_amount_calc()

}

function delete_row(element) {
    let row = element.parentNode.parentNode
    let pro_name = row.querySelector('#product_name').textContent


    var remove_index = order_array.findIndex(product => product.Product_name === pro_name);
    order_array.splice(remove_index, 1)
    row.parentNode.removeChild(row);
    if (order_array.length === 0) {
        document.getElementById("total_amount_show").innerHTML = ""
    }


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
        document.getElementById("total_amount_show").innerHTML = `$  ${add}`
        console.log("total-price = ", add);

    }
}

function arrange_num() {
    let num_elements = document.getElementsByClassName("nums")
    for (let i = 0; i < num_elements.length; i++) {
        num_elements[i].innerHTML = i + 1
    }
}

function select_customer(element) {
    let selected_customer = element.value
    console.log(selected_customer);

    if (selected_customer === "Select Costomer") {
        document.getElementById("recipt_inside_body").innerHTML = "Customer Name : "
    } else {
        let customer = document.getElementById("invoice_select_box_customer").value
        console.log(customer);
        document.getElementById("recipt_inside_body").innerHTML = `Customer Name : ${customer}`
    }

}

function check_number() {
    let value = document.getElementById("product_price").value

    if (value < 1) {
        document.getElementById("product_price").value = null
    }

}

function completed_purchase() {
    if (order_array.length === 0) {
        var toastElement = new bootstrap.Toast(document.getElementById('liveToast'));
        toastElement.show();
    } else {
        var modalElement = document.getElementById('bill_modal');
        var modal = new bootstrap.Modal(modalElement);
        modal.show();
        let customer = document.getElementById("invoice_select_box_customer").value
        document.getElementById("bill_table_body").innerHTML = ""
        if (customer === "Select Costomer") {
            customer = "_________"
        }
        document.getElementById("customer_name_show").innerHTML = `Customer Name : ${customer}`
        let all_quantitys = document.getElementsByClassName("quantity")
        let all_prices = document.getElementsByClassName("prices")
        let all_totals = document.getElementsByClassName("totals")
        let amount = document.getElementById("total_amount_show").innerHTML

        for (let i = 0; i < order_array.length; i++) {
            let quantity = all_quantitys[i].value
            let price = all_prices[i].value
            let total = all_totals[i].innerHTML
            let product = order_array[i].Product_name

            let row = document.createElement("tr")
            row.innerHTML = `  
        <tr>
        <th scope="row">${i + 1}</th>
        <td>${product}</td>
        <td>${price}</td>
        <td>${quantity}</td>
        <td>${total}</td>
        </tr>`
            document.getElementById("bill_table_body").appendChild(row)


        }
        document.getElementById("Total_Amount").innerHTML = `${amount}`
    }



    // print()
}



function saveToFile() {
    // var pageContent = document.documentElement.outerHTML;
    // html2pdf().from(pageContent).save();


    // document.getElementById('save_bttn').addEventListener('click', saveToFile);
    // print()

    // window.jsPDF = window.jspdf.jsPDF;

    // var doc = save()
}
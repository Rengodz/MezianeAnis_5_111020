// Retrieve current product choices
let choices = JSON.parse(localStorage.getItem('choices'));
console.log(choices)

let productChoice = localStorage.getItem(choices);


// Get html zone where we want to add the product title
let cartProduct = document.getElementById('cart__items');
// Insert product title into corresponding html zone
cartProduct.innerHTML += localStorage.choices;



for( let i = 0; i < localStorage.length; i++){
    localStorage.key(4);
}

let totalQuantity = document.getElementById('totalQuantity')
totalQuantity.innerHTML += localStorage.length.choices;
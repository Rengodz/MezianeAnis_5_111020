// Retrieve current product choices
let choices = JSON.parse(localStorage.getItem('choices'));
console.log(choices)

let productChoice = localStorage.getItem(choices);


// Get html zone where we want to add the product title
let cartProduct = document.getElementById('cart__items');
// Insert product title into corresponding html zone
cartProduct.innerHTML += localStorage.choices;

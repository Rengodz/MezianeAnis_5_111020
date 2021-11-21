// Get id of the current product from the url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')
let currentProduct;


// Call API to get one product based on the id we juste retrieved
fetch('http://localhost:3000/api/products/' + id)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(product) {
        currentProduct = product;

        // Get html zone where we want to add the product title
        let productTitle = document.getElementById('title');
        // Insert product title into corresponding html zone
        productTitle.innerHTML += product['name'];

        // Get html zone where we want to add the product description
        let productDescription = document.getElementById('description');
        // Insert product description into corresponding html zone
        productDescription.innerHTML += product['description'];

        // Get html zone where we want to add the product price
        let productPrice = document.getElementById('price');
        // Insert product price into corresponding html zone
        productPrice.innerHTML += product['price'];

        // Get html zone where we want to add the product image
        let productImage = document.getElementsByClassName('item__img')[0];
        // Insert product image into corresponding html zone
        productImage.innerHTML += `<img src="` + product['imageUrl'] + `" alt="` + product['altTxt'] + `">`;

        // Get html zone where we want to add the product color
        let select = document.getElementById('colors');
        for(color in product['colors']) {
            select.options[select.options.length] = new Option(product['colors'][color], color);
        };

    })
    .catch(function(err) {
        // Une erreur est survenue
        console.log('Error occured during api call..');
    });

    // Get add to cart button
    let addToCartButton = document.getElementById('addToCart');

    // Add onclick listener on add to cart button
    addToCartButton.addEventListener('click', (event) => {
        event.preventDefault();
        let colorsSelect = document.getElementById('colors');
        let productChoice = {
            id: currentProduct['_id'],
            name: currentProduct['name'],
            unitPrice: currentProduct['price'],
            colors: colorsSelect.options[colorsSelect.selectedIndex].text,
            quantity: document.getElementById('quantity').value,
            imageUrl: currentProduct['imageUrl']
            
        };
        console.log(productChoice)


        // Add list of choices in localstorage only once if not exist
        let choices = JSON.parse(localStorage.getItem('choices'));
        if (choices) {
            console.log('already exist')
        }
        else {
            choices = []
            localStorage.setItem('choices', JSON.stringify(choices));
        }
        
        // Add current choice to local storage
        choices.push(productChoice)
        localStorage.setItem('choices', JSON.stringify(choices));
    });

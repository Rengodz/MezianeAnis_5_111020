// Get id of the current product from the url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

// Call API to get one product based on the id we juste retrieved
fetch('http://localhost:3000/api/products/' + id)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(product) {
        console.log(product);

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
<<<<<<< HEAD
        let productImage = document.getElementsByClassName('item__img')[0];
=======
        let productImage = document.getElementsByClassName('item__img');
>>>>>>> d2cb46f3c1df05021c3b4b88c3e0e59d701ac0b9
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

function addToLocalStorage()
{
    localStorage.setItem('cart');
    alert('Item added');
}

function addToCart()
{
    const addToCart = document.getElementById('addToCart');
    addToCart.onClick = addToLocalStorage;
}


function addProduct(){
    let products = [];
    if(localStorage.getItem('products')){
        products = JSON.parse(localStorage.getItem('products'));
    }
    products.push({'productId' : productId + 1, image : '<imageLink>'});
    localStorage.setItem('products', JSON.stringify(products));
}

// user data
    // effective Btn creation
    let btnEnvoyer = document.getElementById('addToCart');

    btnEnvoyer.addEventListener('click', (event) => {
        event.preventDefault();
        let optionsProduit = {
            id: arr._id,
            quantity: parseInt(quantity.value),
            colors: select.value,
            name: arr.name,
            imgProduit: arr.imageUrl,
            imgAltProduit: arr.altTxt,
            price: parseFloat(arr.price)
        
        }

    });

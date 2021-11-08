// Get html zone where we want to add all products
let items = document.getElementById('items');

// Call API to get all products and add them to HTML
fetch('http://localhost:3000/api/products/')
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(products) {

        for (const product of products) {
            items.innerHTML += `
        <a href="./product.html?id=` + product['_id'] + `">
          <article>
            <img src="` + product['imageUrl'] + `" alt="` + product['altTxt'] + `">
            <h3 class="productName">` + product['name'] + `</h3>
            <p class="productDescription">` + product['description'] + `</p>
          </article>
        </a>
      `;
        }

    })
    .catch(function(err) {
        // Une erreur est survenue
        console.log('Error occured during api call..')
    });

var cart = localStorage.getItem('cart');
console.log(cart)

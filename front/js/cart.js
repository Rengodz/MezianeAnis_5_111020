// Define input validators
const validFirstName = (input_name) => {
    let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
    let regexName = new RegExp('^[a-zA-Z]{2,21}$', 'g');
    let valid = false;
    let testName = regexName.test(input_name.value);
    if (testName) {
        firstNameErrorMsg.innerText = '';
        valid = true;
    } else {
        firstNameErrorMsg.innerText = 'Veuillez entrer un prénom valide';
    }
    return valid;
}
const validLastName = (input_name) => {
    let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
    let regexName = new RegExp('^[a-zA-Z]{2,21}$', 'g');
    let valid = false;
    let testName = regexName.test(input_name.value);
    if (testName) {
        lastNameErrorMsg.innerText = '';
        valid = true;
    } else {
        lastNameErrorMsg.innerText = 'Veuillez entrer un nom valide';
    }
    return valid;
}
const validAddress = (input_name) => {
    let addressErrorMsg = document.getElementById('addressErrorMsg');
    let regexAddress = new RegExp('^([0-9]*) ([a-zA-Z,\. ]*)$', 'g');
    let valid = false;
    let testAddress = regexAddress.test(input_name.value);
    if (testAddress) {
        addressErrorMsg.innerText = '';
        valid = true;
    } else {
        addressErrorMsg.innerText = 'Veuillez entrer une adresse valide';
    }
    return valid;
}
const validCity = (input_name) => {
    let cityErrorMsg = document.getElementById('cityErrorMsg');
    let regexCity = new RegExp('^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$', 'g');
    let valid = false;
    let testCity = regexCity.test(input_name.value);
    if (testCity) {
        cityErrorMsg.innerText = '';
        valid = true;
    } else {
        cityErrorMsg.innerText = 'Veuillez entrer une ville valide';
    }
    return valid;
}
const validEmail = (input_email) => {
    let emailErrorMsg = document.getElementById('emailErrorMsg');
    let regexEmail = new RegExp(
        '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g'
    );
    let valid = false;
    // boolean confirmation input for regexEmail
    let testEmail = regexEmail.test(input_email.value);
    if (testEmail) {
        emailErrorMsg.innerText = '';
        valid = true;
    } else {
        emailErrorMsg.innerText = 'Veuillez entrer une adresse e-mail valide';
    }
    return valid;
}

// Retrieve current product choices
let choices = JSON.parse(localStorage.getItem('choices'));

// Get html zone where we want to add product choices
let cartItems = document.getElementById('cart__items');

// Iterate choices to add each choice to html zone
if (choices) {

    choices.forEach(function(item) {
        console.log(item);
        cartItems.innerHTML += `
            <article class="cart__item" data-id="` + item['id'] + `">
                <div class="cart__item__img">
                    <img src="` + item['imageUrl'] + `" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__titlePrice">
                        <h2>` + item['name'] + `</h2>
                        <p>` + item['unitPrice'] * item['quantity'] + `€</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté: </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="` + item['quantity'] + `">
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>

        `;
    });

    // Calculate total price itering localstorage
    let totalPrice = 0;
    choices.forEach(function(item) {
        totalPrice += item['quantity'] * item['unitPrice'];
        let totalPriceHtml = document.getElementById('totalPrice');
        totalPriceHtml.innerHTML = totalPrice;
    });

    // Add an event on click on delete choice button
    let deleteItemButtons = document.getElementsByClassName('deleteItem');
    for (let button of deleteItemButtons) {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const article = button.closest('article');
            const choiceIdToDelete = article.getAttribute('data-id');
            // Iterate each choice of choices and delete the choice
            // corresponding to the one selected with the delete button.
            for (let i = 0; i < choices.length; i++) {
                if (choices[i]['id'] == choiceIdToDelete) {
                    choices.splice(i, 1);
                    // Update localstorage with new choices
                    localStorage.removeItem('choices');
                    localStorage.setItem('choices', JSON.stringify(choices));

                    // Update total price when deleting article
                    // location.reload();
                    let totalPrice = 0;
                    // Calculate total price itering localstorage
                    choices.forEach(function(item) {
                        totalPrice += item['quantity'] * item['unitPrice'];
                        let totalPriceHtml = document.getElementById('totalPrice');
                        totalPriceHtml.innerHTML = totalPrice;
                    });
                }
            }
            // Delete html product zone
            article.remove();
        });
    }

    // Get quantity elements
    let itemQuantityInputs = document.getElementsByClassName('itemQuantity');
    for (let button of itemQuantityInputs) {
        button.addEventListener('change', (event) => {
            console.log(button.value);
            event.preventDefault();
            const article = button.closest('article');
            const choiceIdToUpdate = article.getAttribute('data-id');
            console.log("choiceIdToUpdate:" + choiceIdToUpdate);
            // Updating sub total item price on Html
            location.reload();

            // Update product into choices with the new quantity
            // Iterate each choice of choices and update the choice quantity
            // corresponding to the one selected with the quantity button.
            for (let i = 0; i < choices.length; i++) {
                if (choices[i]['id'] == choiceIdToUpdate) {
                    choices[i]['quantity'] = button.value;
                }
            }
            // Update localstorage with new choices
            localStorage.removeItem('choices');
            localStorage.setItem('choices', JSON.stringify(choices));
            console.log('new choices : ');
            console.log(choices);

            // Calculate total price itering localstorage
            let totalPrice = 0;
            choices.forEach(function(item) {
                totalPrice += item['quantity'] * item['unitPrice'];
                let totalPriceHtml = document.getElementById('totalPrice');
                totalPriceHtml.innerHTML = totalPrice;
            });


        });
    }
}

let form = document.querySelector('.cart__order__form');
let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let address = document.getElementById('address');
let city = document.getElementById('city');
let email = document.getElementById('email');

//  regex creation

form.firstName.addEventListener('change', function() {
    // "this" input of firstName
    validFirstName(this);
});

form.lastName.addEventListener('change', function() {
    validLastName(this);
});

form.address.addEventListener('change', function() {
    validAddress(this);
});

form.city.addEventListener('change', function() {
    validCity(this);
});

form.email.addEventListener('change', function() {
    validEmail(this);
});

// Get order button
let orderButton = document.getElementById('order');

// Add onclick listener on order button
orderButton.addEventListener('click', (event) => {
    event.preventDefault();

    // Create contact object
    const contact = {
        'firstName': firstName.value,
        'lastName': lastName.value,
        'address': address.value,
        'city': city.value,
        'email': email.value
    }
    console.log(contact);

    // Create product list id
    let productIds = choices.map((choice) => choice.id);
    console.log('productIds');
    console.log(productIds);

    // Call order method
    fetch('http://localhost:3000/api/products/order', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "contact": contact,
                "products": productIds
            })
        })
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then((data) => {
            localStorage.clear();
            document.location.href = `confirmation.html?order_id=${data.orderId}`;
        })
        .catch(function(err) {
            // Une erreur est survenue
            console.log('Error occured during api call..');
        });
});
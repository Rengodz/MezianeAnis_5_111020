// Retrieve current product choices
let choices = JSON.parse(localStorage.getItem('choices'));
console.log(choices);

// Get html zone where we want to add product choices
let cartItems = document.getElementById('cart__items');

// Iterate choices to add each choice to html zone
if (choices) {
    choices.forEach(function(item){
        console.log(item);
        cartItems.innerHTML += `
            <article class="cart__item" data-id="`+item['id']+`">
                <div class="cart__item__img">
                    <img src="`+item['imageUrl']+`" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__titlePrice">
                        <h2>`+item['name']+`</h2>
                        <p>`+item['unitPrice'] * item['quantity'] +`€</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté: </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="`+item['quantity']+`">
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
    choices.forEach(function(item){
        totalPrice += item['quantity'] * item['unitPrice'];
        
    let totalPriceHtml = document.getElementById('totalPrice');
    totalPriceHtml.innerHTML += (totalPrice);
    });
    console.log(totalPrice);

    // Add an event on click on delete choice button
    let deleteItemButtons = document.getElementsByClassName('deleteItem');
    for (let button of deleteItemButtons) {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const article = button.closest('article');
            const choiceIdToDelete = article.getAttribute('data-id');
            // Iterate each choice of choices and delete the choice
            // corresponding to the one selected with the delete button.
            for (let i=0; i<choices.length; i++) {
                if (choices[i]['id'] == choiceIdToDelete) {
                    console.log(choices[i]['id']);
                    choices.splice(i, 1);
                    console.log('---choices---');
                    console.log(choices);
                    // Update localstorage with new choices
                    localStorage.removeItem('choices');
                    localStorage.setItem('choices', JSON.stringify(choices));
                    // Delete article choice from html
                    // Update total price when deleting article
                    location.reload();
                    




                    // Test du INPUT confirmation de commande.
                    

let form = document.querySelector('.cart__order__form');
let order = document.getElementById('order');
let orderId = document.getElementById('orderId');
let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let address = document.getElementById('address');
let city = document.getElementById('city');
let email = document.getElementById('email');

// ---------- Création regex -------------

form.firstName.addEventListener('change', function(){
    // "this" est l'élément actuellement écouté par l'input avec le name firstName
    validFirstName(this);
});

form.lastName.addEventListener('change', function(){
    validLastName(this);
});

form.address.addEventListener('change', function(){
    validAddress(this);
});

form.city.addEventListener('change', function(){
    validCity(this);
});

form.email.addEventListener('change', function(){
    validEmail(this);
});

// on créer une fonction pour la validation des noms avec errexpression régulière
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
    // on créer une variable qui contient une valeur false ou true selon
    // la valeur entré dans l'input et testé par le regexEmail
    let testEmail = regexEmail.test(input_email.value);
    if (testEmail) {
        emailErrorMsg.innerText = '';
        valid = true;
    } else {
        emailErrorMsg.innerText = 'Veuillez entrer une adresse e-mail valide';
    }
    return valid;
}

/* on créer une fonction qui prend un tableau en argument. Nous utilisons
ensuite .map pour aller chercher et push l'id de chaque élément du 
localStorage dans notre tableau en argument */
function getId(arr) {
    tabLocalStorage.map(e => {
        return arr.push(e.id);
    });
}

order.addEventListener('click', (e) => {
    e.preventDefault();
    // nous créons un tableau vide puis on le rempli avec getId
    let productId = [];
    getId(productId);
    
    
    /* si les valeurs retournées par nos fonction de validations sont à true
    nous créons l'objet order qui contient les valeurs entrés dans les inputs
    du formulaire + un tableau contenant les id des produits dans le panier */
    if (
        !validFirstName(name) ||
        !validLastName(lastName) ||
        !validAddress(address) ||
        !validCity(city) ||
        !validEmail(email)
        ) {
        e.preventDefault();
    } else {
        let order = {
            contact: {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value
            },
            products: productId
        };

        /* nous envoyons notre objet de commande (formaté au format JSON) à 
        l'adresse /products de l'API qui contient une entrée du même nom */
        fetch('http://localhost:3000/api/products/order', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(order)
        })
        .then((reponse) => reponse.json())
        .then((data) => {
            localStorage.clear();
            document.location.href = `confirmation.html?order_id=${data.orderId}`;
        })
        .catch((err) => console.log(err));
        
    }
});
                }
            }
        });
    }
}


                    
                
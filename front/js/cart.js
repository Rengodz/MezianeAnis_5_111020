// Retrieve current product choices
let choices = JSON.parse(localStorage.getItem('choices'));
console.log(choices)

// Get html zone where we want to add product choices
let cartItems = document.getElementById('cart__items');

// Iterate choices to add each choice to html zone
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
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
                    article.remove();
                    // Update total price when deleting article
                    // TODO.
                }
            }
        });
    }
}


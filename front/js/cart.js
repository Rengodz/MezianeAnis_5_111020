// Retrieve current product choices
let choices = JSON.parse(localStorage.getItem('choices'));
console.log(choices);

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


// Get delete item button
let deleteItemButton = document.getElementById('deleteItem');
// Add onclick listener on delete item to cart button
deleteItemButton.addEventListener('click', (event) => {
    event.preventDefault();
    function removeItem(name) {
        for (let i = 0; i < choices.length; i += 1) {
          if (choices[i].name === name) {
              choices[i].count --;
              
              if (choices[i].count === 0) {
                  choices.splice(i, 1); // removes item from the array
              }
              break;
            }
        }
      }


      


              let totalPrice = [];

              for (let price = 0; price < choices.lenght; price++){
                  let productPriceInCart = choices[price].unitPrice;
                  
                  totalPrice.push(productPriceInCart)
                  console.log(totalPrice);
              }
              
              const reducer = (accumulator, currentValue) => accumulator + currentValue;
              const totalResult = totalPrice.reduce(reducer,0);
            
              console.log(totalResult);  
            
            
              // Get html zone where we want to add the total price
              let cartPrice = document.getElementById('totalPrice');
              // Insert total price into corresponding html zone
              cartPrice.innerHTML += totalPrice;
            
           
           
 });


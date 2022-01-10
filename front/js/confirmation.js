   // Get id of the current order from the url
   const queryString = window.location.search;
   const urlParams = new URLSearchParams(queryString);
   const orderId = urlParams.get('order_id')

   console.log(orderId)

   // Get html zone where we want to add the product title
   let orderIds = document.getElementById('orderId');
   // Insert product title into corresponding html zone
   orderIds.innerHTML += orderId;
const cart = JSON.parse(localStorage.getItem('cart')) || [];

const checkoutItems = document.querySelector('#checkout-items');
const checkoutTotal = document.querySelector('#checkout-total');
const checkoutForm = document.querySelector('#checkout-form');


function displayCheckoutItems() {

  checkoutItems.innerHTML = '';

  let total = 0;


   if (cart.length === 0) {

  checkoutItems.innerHTML = `
    <div class="empty-checkout">

      <div class="empty-checkout-icon">
        🛒
      </div>

      <h3>Your cart is empty</h3>

      <p>
        Please add products to your cart before checking out.
      </p>

      <a href="dee.html" class="back-to-shop">
        Back to Shop
      </a>

    </div>
  `;

  checkoutTotal.textContent = '₦0';

  checkoutForm.style.display = 'none';

  return;
}
    


  cart.forEach(function(product) {

    const productTotal =
      product.price * product.quantity;

    total += productTotal;


    const checkoutItem =
      document.createElement('div');

    checkoutItem.classList.add('checkout-item');


    checkoutItem.innerHTML = `

      <div class="checkout-item-image">

        <img
          src="${product.image}"
          alt="${product.name}"
        >

      </div>


      <div class="checkout-item-details">

        <h3>${product.name}</h3>

        <p>${product.size}</p>

        <p>Quantity: ${product.quantity}</p>

      </div>


      <strong class="checkout-item-price">

        ₦${productTotal.toLocaleString()}

      </strong>

    `;


    checkoutItems.appendChild(checkoutItem);

  });


  checkoutTotal.textContent =
    `₦${total.toLocaleString()}`;

}


displayCheckoutItems();



checkoutForm.addEventListener('submit', function(event) {

  event.preventDefault();


  const name =
    document.querySelector('#name').value.trim();

  const email =
    document.querySelector('#email').value.trim();

  const phone =
    document.querySelector('#phone').value.trim();



  const address =
    document.querySelector('#address').value.trim();


  let orderMessage =
    `*NEW ORDER - DEERICH FOODS*%0A%0A`;

  orderMessage +=
    `*CUSTOMER INFORMATION*%0A`;

  orderMessage +=
    `Name: ${name}%0A`;

  orderMessage +=
    `Email: ${email}%0A`;

  orderMessage +=
    `Phone: ${phone}%0A`;

  orderMessage +=
    `Delivery Address: ${address}%0A%0A`;


  orderMessage +=
    `*ORDER SUMMARY*%0A`;


  cart.forEach(function(product) {

    const productTotal =
      product.price * product.quantity;

    orderMessage +=
      `• ${product.name} - ${product.size}%0A`;

    orderMessage +=
      `  Quantity: ${product.quantity}%0A`;

    orderMessage +=
      `  Price: ₦${productTotal.toLocaleString()}%0A%0A`;

  });


  const total =
    cart.reduce(function(sum, product) {

      return sum + (product.price * product.quantity);

    }, 0);


  orderMessage +=
    `*TOTAL: ₦${total.toLocaleString()}*`;


  const whatsappNumber =
    '2348051326224';


  const whatsappURL =
    `https://wa.me/${whatsappNumber}?text=${orderMessage}`;


  window.open(whatsappURL, '_blank');

  localStorage.removeItem('cart');
});
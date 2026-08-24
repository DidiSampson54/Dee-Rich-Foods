console.log('DeeRich Foods JavaScript is connected!');

const categoryButtons = document.querySelectorAll('.category-button');

const productCards = document.querySelectorAll('.product-mix');

/* SHOP NOW BUTTON */

const shopNow = document.querySelector('.shop-now');

shopNow.addEventListener('click', function() {

  const products = document.querySelector('#products');

  window.scrollTo({
    top: products.offsetTop,
    behavior: 'smooth'
  });

});

  


    
/* CATEGORY FILTERS */

/* SEARCH PRODUCTS */

const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-image');
const productNotFound = document.querySelector('#product-not-found');

function searchProducts() {

  const searchText = searchInput.value.trim().toLowerCase();

  let productFound = false;

  productCards.forEach(function(product) {

    const productName =
      product.dataset.product.toLowerCase();

    const productDescription =
      product.querySelector('.mix-p').textContent.toLowerCase();

    let productCategory = '';

    if (product.classList.contains('mixed-cereal')) {

      productCategory = 'mixed cereal mixed-cereals cereal';

    } else if (product.classList.contains('build-up-product')) {

      productCategory = 'build-up build-up powders powder powders';

    } else if (product.classList.contains('flour-product')) {

      productCategory = 'flour flours';

    }

    if (
      searchText === '' ||
      productName.includes(searchText) ||
      productDescription.includes(searchText) ||
      productCategory.includes(searchText)
    ) {

      product.style.display = 'block';
      productFound = true;

    } else {

      product.style.display = 'none';

    }

  });

  if (productFound) {

    productNotFound.style.display = 'none';

  } else {

    productNotFound.style.display = 'block';

    productNotFound.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });

  }

  if (productFound && searchText !== '') {

    document.querySelector('#products').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

  }

}


/* SEARCH ICON */

searchButton.addEventListener('click', function() {

  searchProducts();

});


/* ENTER */

searchInput.addEventListener('keydown', function(event) {

  if (event.key === 'Enter') {

    searchProducts();

  }

});


/* CLEAR SEARCH */

searchInput.addEventListener('input', function() {

  if (searchInput.value.trim() === '') {

    productCards.forEach(function(product) {

      product.style.display = 'block';

    });

    productNotFound.style.display = 'none';

  }

});

/*ALL ITEMS*/

const allItems = document.querySelector('.items');

allItems.addEventListener('click', function() {

  productCards.forEach(function(product) {

    product.style.display = 'block';

  });

  categoryButtons.forEach(function(button) {

    button.classList.remove('active');

  });

  allItems.classList.add('active');

});


/* MIXED CEREALS */

const mixedCereals = document.querySelector('.mixed-cereals');

mixedCereals.addEventListener('click', function() {

  productCards.forEach(function(product) {

    if (product.classList.contains('mixed-cereal')) {

      product.style.display = 'block';

    } else {

      product.style.display = 'none';

    }

  });

  categoryButtons.forEach(function(button) {

    button.classList.remove('active');

  });

  mixedCereals.classList.add('active');

});


/* BUILD-UP POWDERS */

const buildUpProduct = document.querySelector('.build-up');

buildUpProduct.addEventListener('click', function() {

  productCards.forEach(function(product) {

    if (product.classList.contains('build-up-product')) {

      product.style.display = 'block';

    } else {

      product.style.display = 'none';

    }

  });

  categoryButtons.forEach(function(button) {

    button.classList.remove('active');

  });

  buildUpProduct.classList.add('active');

});


/* FLOURS */

const flourProduct = document.querySelector('.flours');

flourProduct.addEventListener('click', function() {

  productCards.forEach(function(product) {

    if (product.classList.contains('flour-product')) {

      product.style.display = 'block';

    } else {

      product.style.display = 'none';

    }

  });

  categoryButtons.forEach(function(button) {

    button.classList.remove('active');

  });

  flourProduct.classList.add('active');

});


/* PRODUCT SIZE AND PRICE */

const productSizeSelectors =
  document.querySelectorAll('.product-mix select');


productSizeSelectors.forEach(function(select) {

  const productCard =
    select.closest('.product-mix');


  const priceDisplay =
    productCard.querySelector('.product-price');


  function updatePrice() {

    const price =
      Number(select.value);


    priceDisplay.textContent =
      `Price: ₦${price.toLocaleString()}`;

  }


  select.addEventListener('change', updatePrice);

});



/* PRODUCT SIZE AND PRICE */


productSizeSelectors.forEach(function(select) {

  const productCard =
    select.closest('.product-mix');


  const priceDisplay =
    productCard.querySelector(
      '.selected-price, ' +
      '.selected-weight-price, ' +
      '.selected-protein-price, ' +
      '.selected-soybean-price, ' +
      '.selected-beans-price, ' +
      '.selected-millet-price, ' +
      '.selected-wheat-price'
    );


  function updatePrice() {

    const price =
      Number(select.value);


    priceDisplay.textContent =
      `Price: ₦${price.toLocaleString()}`;

  }


  select.addEventListener('change', updatePrice);

});


/*CART*/

/*
   This array stores everything added
   to the shopping cart.
*/

const cart = JSON.parse(localStorage.getItem('cart')) || [];




/*CART ELEMENTS*/

const addToCartButtons =
  document.querySelectorAll('.add-to-cart');

const cartCount =
  document.querySelector('#cart-count');

const cartNotification =
  document.querySelector('#cart-notification');

const notificationText =
  document.querySelector('.notification-text');

const notificationIcon =
  document.querySelector('#notification-icon');

  if (cart.length > 0) {

  cartCount.textContent = cart.reduce(function(total, product) {

    return total + product.quantity;

  }, 0);

  cartCount.style.display = 'flex';

}

let notificationTimer;


/*ADD TO CART */

addToCartButtons.forEach(function(button) {

  button.addEventListener('click', function() {

    /*
      Find the product card containing
      the button that was clicked.
    */

    const productCard =
      button.closest('.product-mix');


    /*
      Get product name from data-product.
    */

    const productName =
      productCard.dataset.product;


    /*
      Find the select element inside
      this particular product card.
    */

    const sizeSelect =
      productCard.querySelector('select');


    /*
      Get the text of the selected option.
    */

    const selectedSize =
      sizeSelect.options[sizeSelect.selectedIndex].text;


    /*
      Get the actual price from the option value.
    */

    const price =
      Number(sizeSelect.value);


    /*
      Get the product image.
    */

    const productImage =
      productCard.querySelector('img').src;


    /*CHECK IF THIS PRODUCT + SIZE ALREADY EXISTS */

    const existingProduct = cart.find(function(item) {

      return item.name === productName &&
             item.size === selectedSize;

    });


    /*IF IT EXISTS, INCREASE QUANTITY*/

    if (existingProduct) {

      existingProduct.quantity += 1;

    }

    /*OTHERWISE CREATE A NEW CART ITEM*/

    else {

      const product = {

        name: productName,

        image: productImage,

        size: selectedSize,

        price: price,

        quantity: 1

      };

      cart.push(product);

    }


    /*UPDATE CART NUMBER*/

    cartCount.textContent = cart.reduce(function(total, product) {

      return total + product.quantity;

    }, 0);

   cartCount.style.display = 'flex';


/* SAVE CART */

localStorage.setItem('cart', JSON.stringify(cart));


/*
  Rebuild the cart display.
*/

displayCart();


    console.log(cart);

  });

});


/*CART NOTIFICATION */

addToCartButtons.forEach(function(button) {

  button.addEventListener('click', function() {

    const productCard =
      button.closest('.product-mix');

    const productName =
      productCard.dataset.product;


    /*
      Show check mark when adding.
    */

    notificationIcon.textContent = '✓';


    notificationText.textContent =
      `${productName} added to cart!`;


    cartNotification.classList.add('show');


    /*
      Cancel previous timer.
    */

    clearTimeout(notificationTimer);


    /*
      Hide notification after 4 seconds.
    */

    notificationTimer = setTimeout(function() {

      cartNotification.classList.remove('show');

    }, 4000);

  });

});


/* 
   DISPLAY CART
    */

function displayCart() {

  const cartItems =
    document.querySelector('#cart-items');

  const cartTotal =
    document.querySelector('#cart-total');

    const cartMessage =
    document.querySelector('#cart-message');

  /*
    Empty the cart display first.

    This is important because we are
    rebuilding the cart every time.
  */

  cartItems.innerHTML = '';


  /*
    If there are no products...
  */

  if (cart.length === 0) {

    cartItems.innerHTML =
      '<p class="empty-cart-message">Your cart is empty 😔</p>';

      cartMessage.textContent = '';

    cartTotal.parentElement.style.display = 'none';

    document.querySelector('#checkout-button').style.display = 'none';

    return;
  }

const totalItems = cart.length;

if (totalItems === 1) {

  cartMessage.textContent = '1 item in your cart';

} else {

  cartMessage.textContent =
    `${totalItems} items in your cart`;

}
  /*
    If there ARE products,
    show the total and checkout button.
  */

  cartTotal.parentElement.style.display = 'flex';

  document.querySelector('#checkout-button').style.display = 'block';


  /*
    This variable will hold
    the total price.
  */

  let total = 0;


  /*
    Go through every product
    inside the cart array.
  */

  cart.forEach(function(product) {


    /*
      Calculate the total for this product.

      Example:

      price = ₦5,000
      quantity = 3

      5,000 × 3 = ₦15,000
    */

    total += product.price * product.quantity;


    /*
      Create a new HTML div.
    */

    const cartItem =
      document.createElement('div');


    /*
      Give the div the class cart-item.
    */

    cartItem.classList.add('cart-item');


    /*
      Put the product information inside it.
    */

    cartItem.innerHTML = `

      <div class="cart-item-image">

        <img
          src="${product.image}"
          alt="${product.name}"
        >

      </div>


      <div class="cart-item-details">

        <h3>${product.name}</h3>

        <p>${product.size}</p>


        <div class="cart-item-bottom">

          <div class="quantity-controls">

            <button class="minus">−</button>

            <span>${product.quantity}</span>

            <button class="plus">+</button>

          </div>


          <button class="delete-item">

            <i class="fa-solid fa-trash-can"></i>

          </button>

        </div>

      </div>


      <strong class="cart-item-price">

        ₦${(product.price * product.quantity).toLocaleString()}

      </strong>

    `;


    /*
      Put this cart item inside
      the cart container.
    */

    cartItems.appendChild(cartItem);


    /*
       PLUS BUTTON
    */

    const plusButton =
      cartItem.querySelector('.plus');


    plusButton.addEventListener('click', function() {

      /*
        Increase this product's quantity.
      */

      product.quantity += 1;
      localStorage.setItem('cart', JSON.stringify(cart));


      /*
        Recalculate cart number.
      */

      cartCount.textContent =
        cart.reduce(function(total, product) {

          return total + product.quantity;

        }, 0);


      /*
        Rebuild the cart.
      */

      displayCart();

    });


    /*
       MINUS BUTTON
    */

    const minusButton =
      cartItem.querySelector('.minus');


    minusButton.addEventListener('click', function() {

      /*
        If quantity is greater than 1,
        decrease it.
      */

      if (product.quantity > 1) {

        product.quantity -= 1;

      }

      /*
        If quantity is already 1,
        remove the product completely.
      */

      else {

        const productIndex =
          cart.indexOf(product);

        cart.splice(productIndex, 1);
      }


localStorage.setItem('cart', JSON.stringify(cart));


      /*
        Update cart number.
      */

      cartCount.textContent =
        cart.reduce(function(total, product) {

          return total + product.quantity;

        }, 0);


      /*
        If cart is empty,
        hide the cart number.
      */

      if (cart.length === 0) {

        cartCount.style.display = 'none';

      }


      /*
        Rebuild the cart.
      */

      displayCart();

    });


    /*
       DELETE BUTTON
    */

    const deleteButton =
      cartItem.querySelector('.delete-item');


    deleteButton.addEventListener('click', function() {

      /*
        Find the position of this product
        inside the cart array.
      */

      const productIndex =
        cart.indexOf(product);


      /*
        Remove the product.
      */

      cart.splice(productIndex, 1);

      localStorage.setItem('cart', JSON.stringify(cart));


      /*
        Recalculate cart number.
      */

      cartCount.textContent =
        cart.reduce(function(total, product) {

          return total + product.quantity;

        }, 0);


      /*
        If cart is completely empty,
        hide the cart number.
      */

      if (cart.length === 0) {

        cartCount.style.display = 'none';

      }


      /*
        Change notification icon
        from check mark to trash.
      */

      notificationIcon.textContent = '🗑️';


      notificationText.textContent =
        `${product.name} removed from cart!`;


      cartNotification.classList.add('show');


      clearTimeout(notificationTimer);


      notificationTimer = setTimeout(function() {

        cartNotification.classList.remove('show');

      }, 4000);


      /*
        Rebuild the cart.
      */

      displayCart();

    });

  });


  /*
    After going through ALL products,
    show the final total.
  */

  cartTotal.textContent =
    `₦${total.toLocaleString()}`;

}

/* 
   OPEN AND CLOSE CART */

const cartLink =
  document.querySelector('#cart-link');

const cartPanel =
  document.querySelector('#cart-panel');

const closeCart =
  document.querySelector('#close-cart');

const cartOverlay =
  document.querySelector('#cart-overlay');


/*  OPEN CART  */

cartLink.addEventListener('click', function(event) {

  event.preventDefault();


  cartPanel.classList.add('open');

  cartOverlay.classList.add('show');


  /*
    Stop the main page from scrolling
    while cart is open.
  */

  document.body.style.overflow = 'hidden';

});


/*CLOSE CART WITH X */

closeCart.addEventListener('click', function() {

  cartPanel.classList.remove('open');

  cartOverlay.classList.remove('show');

  document.body.style.overflow = '';

});


/* CLOSE CART BY CLICKING OVERLAY */

cartOverlay.addEventListener('click', function() {

  cartPanel.classList.remove('open');

  cartOverlay.classList.remove('show');

  document.body.style.overflow = '';

});

/* DISPLAY CART WHEN PAGE LOADS */

displayCart();



/* OPEN CHECKOUT */

const checkoutButton =
  document.querySelector('#checkout-button');

  checkoutButton.addEventListener('click', function() {

  localStorage.setItem('cart', JSON.stringify(cart));

  window.location.href = 'checkout.html';

});


/* SEND US A MESSAGE */

const messageForm =
  document.querySelector('.send-message form');

const messageNotification =
  document.querySelector('#message-notification');

let messageNotificationTimer;


messageForm.addEventListener('submit', function(event) {

  event.preventDefault();


  const name =
    document.querySelector('#name').value.trim();

  const email =
    document.querySelector('#email').value.trim();

  const phone =
    document.querySelector('#phone').value.trim();

  const location =
    document.querySelector('#place').value.trim();

  const message =
    document.querySelector('#message').value.trim();


  let whatsappMessage =
    `*NEW CUSTOMER MESSAGE - DEERICH FOODS*%0A%0A`;

  whatsappMessage +=
    `*CUSTOMER INFORMATION*%0A`;

  whatsappMessage +=
    `Name: ${name}%0A`;

  whatsappMessage +=
    `Email: ${email}%0A`;

  whatsappMessage +=
    `Phone: ${phone}%0A`;

  whatsappMessage +=
    `Location: ${location}%0A%0A`;

  whatsappMessage +=
    `*MESSAGE*%0A`;

  whatsappMessage +=
    `${message}`;


  const whatsappNumber =
    '2348051326224';


  const whatsappURL =
    `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;


  /* SHOW NOTIFICATION FIRST */

  messageNotification.classList.add('show');


  /* CANCEL PREVIOUS TIMER */

  clearTimeout(messageNotificationTimer);


  /* HIDE AFTER 4 SECONDS */

  messageNotificationTimer =
    setTimeout(function() {

      messageNotification.classList.remove('show');

    }, 4000);


  /* CLEAR FORM */

  messageForm.reset();


  /* OPEN WHATSAPP AFTER A SHORT DELAY */

  setTimeout(function() {

    window.open(whatsappURL, '_blank');

  }, 3000);

});
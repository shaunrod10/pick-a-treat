let navbar = document.querySelector('.navbar');
let menuBtn = document.querySelector('#menu-btn');

menuBtn.onclick = () => {
  menuBtn.classList.toggle('fa-times');
  navbar.classList.toggle('active');
};

var swiper = new Swiper('.home-slider', {
  grabCursor: true,
  loop: true,
  centeredSlides: true,
  spaceBetween: 10,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

var swiper = new Swiper('.food-slider', {
  grabCursor: true,
  loop: true,
  centeredSlides: true,
  spaceBetween: 20,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    700: {
      slidesPerView: 2,
    },
    1000: {
      slidesPerView: 3,
    },
  },
});

let previewContainer = document.querySelector('.food-preview-container');
let previewBox = previewContainer.querySelectorAll('.food-preview');

document.querySelectorAll('.food .slide').forEach(food => {
  food.onclick = () => {
    previewContainer.style.display = 'flex';
    let name = food.getAttribute('data-name');
    previewBox.forEach(preview => {
      let target = preview.getAttribute('data-target');
      if (name == target) {
        preview.classList.add('active');
      }
    });
  };
});

previewContainer.querySelector('#close-preview').onclick = () => {
  previewContainer.style.display = 'none';
  previewBox.forEach(close => {
    close.classList.remove('active');
  });
};

var swiper = new Swiper('.menu-slider', {
  grabCursor: true,
  loop: true,
  autoHeight: true,
  centeredSlides: true,
  spaceBetween: 20,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

var swiper = new Swiper('.blogs-slider', {
  grabCursor: true,
  loop: true,
  centeredSlides: true,
  autoHeight: true,
  spaceBetween: 20,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    700: {
      slidesPerView: 2,
    },
    1000: {
      slidesPerView: 3,
    },
  },
});

//cart
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

cartIcon.onclick = () => {
  cart.classList.add('active');
};

closeCart.onclick = () => {
  cart.classList.remove('active');
};

//cart working
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

//making function
function ready() {
  //remove item from cart
  var removeCartButtons = document.getElementsByClassName('cart-remove');
  console.log(removeCartButtons);
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener('click', removeCartItem);
  }

  //quantity changes
  var quantityInputs = document.getElementsByClassName('cart-quantity');
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
  }
  //add to cart
  var addCart = document.getElementsByClassName('cart-btn');
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener('click', addCartClicked);
  }
}
//remove item from cart
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
}
//Quantity changes
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
}

//add to cart
function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName('food-title')[0].innerText;
  var price = shopProducts.getElementsByClassName('price')[0].innerText;
  var foodImg = shopProducts.getElementsByClassName('food-img')[0].src;
  console.log(title, price, foodImg);
  updatetotal();
}

function addProductToCart(title, price, foodImg) {
  var cartShopBox = document.createElement('div');
  cartShopBox.classList.add('cart-box');
  var cartItems = document.getElementsByClassName('cart-content')[0];
  var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
  for (var i = 0; i < cartItemsNames.length; i++) {
    alert('You have already added this item to cart');
    return;
  }
}

// Update total
function updatetotal() {
  var cartContent = document.getElementsByClassName('cart-content')[0];
  var cartBoxes = cartContent.getElementsByClassName('cart-box');
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName('cart-price')[0];
    var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
    var price = parseFloat(priceElement.innerText.replace('$', ''));
    var quantity = quantityElement.value;
    total = total + price * quantity;
    //if price contain some cents value
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('total-price')[0].innerText = '$' + total;
  }
}

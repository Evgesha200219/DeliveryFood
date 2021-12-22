
const cart = () => {
'use strict';
const cartButton = document.getElementById('cart-button');
const modalCart = document.querySelector('.modal-cart');
const closeBtn = modalCart.querySelector('.close');

cartButton.addEventListener('click', () => {
  modalCart.classList.add('is-open');
})
closeBtn.addEventListener('click', () => {
  modalCart.classList.remove('is-open');
})


}
cart();
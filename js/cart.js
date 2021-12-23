
const cart = () => {
'use strict';
const cartButton = document.getElementById('cart-button');
const modalCart = document.querySelector('.modal-cart');
const closeBtn = modalCart.querySelector('.close');
const body = modalCart.querySelector('.modal-body');

const renderItems = (data) => {
  body.innerHTML = '';

  data.forEach(({name, price, id, count}) => {
    const cartElem = document.createElement('div');

    cartElem.classList.add('food-row');

    cartElem.innerHTML = `
        <span class="food-name">${name}</span>
        <strong class="food-price">${price}</strong>
        <div class="food-counter">
          <button class="counter-button btn-minus">-</button>
          <span class="counter">${count}</span>
          <button class="counter-button btn-plus">+</button>
        </div>
    `
    body.append(cartElem);
  })
}

cartButton.addEventListener('click', () => {
  if(localStorage.getItem('cart')) {
    renderItems(JSON.parse(localStorage.getItem('cart')));
  }

  modalCart.classList.add('is-open');
})

closeBtn.addEventListener('click', () => {
  modalCart.classList.remove('is-open');
})
}
cart();
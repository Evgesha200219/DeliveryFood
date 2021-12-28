
const cart = () => {
'use strict';
const cartButton = document.getElementById('cart-button');
const modalCart = document.querySelector('.modal-cart');
const closeBtn = modalCart.querySelector('.close');
const body = modalCart.querySelector('.modal-body');
const buttonSend = modalCart.querySelector('.button-primary');
const clearCart = modalCart.querySelector('.clear-cart');
const cartSum = modalCart.querySelector('.modal-pricetag');

/**Функция очищает корзину, удаляет данные из localStorage и закрывает модально окно корзины
 */
const resetCart = () => {
  body.innerHTML = '';
  localStorage.removeItem('cart');
  modalCart.classList.remove('is-open');
}

const countPlus = (id) => {
  //получам массив из localStorage, кот. записан на момент вызова данной функции
  const cartArray = JSON.parse(localStorage.getItem('cart'));

  cartArray.map((item) => {//перебираем массив.
    if (item.id === id) {  // если id совпадают
      item.count++         // увеличиваем количество на 1
    }
    return item;      
  })
  // записываем массив с новыми данными
  localStorage.setItem('cart', JSON.stringify(cartArray));
  // выводим свежие данные из localStorage в модальное окно корзины
  renderItems(cartArray);
}

const countMinus = (id) => {
  const cartArray = JSON.parse(localStorage.getItem('cart'));

  cartArray.map((item) => {
    if (item.id === id) {item.count > 0 ? item.count-- : 0 }
    return(item);
})
  
  localStorage.setItem('cart', JSON.stringify(cartArray));
  
  renderItems(cartArray);
}

/**Функция отрисовывает выбранные продукты в модальном окне корзины
 * 
 * @param {object} data массив данных из localStorage
 */
const renderItems = (data) => {
  body.innerHTML = '';

  data.forEach(({name, price, id, count}) => {
    const cartElem = document.createElement('div');

    cartElem.classList.add('food-row');

    cartElem.innerHTML = `
        <span class="food-name">${name}</span>
        <strong class="food-price">${price}</strong>
        <div class="food-counter">
          <button class="counter-button btn-minus" data-index="${id}">-</button>
          <span class="counter">${count}</span>
          <button class="counter-button btn-plus" data-index="${id}">+</button>
        </div>
    `
    body.append(cartElem);
  })
  sumCart();
}
/**Функция считает сумму стоимости все продуктов в корзине 
 */
const sumCart = () => {
  const cartArray = JSON.parse(localStorage.getItem('cart'));

  cartArray.forEach((item) => {
    item.summ = item.count * item.price;
  })
  
  const result = cartArray.reduce((sum, num) => num.summ + sum, 0)
  
  cartSum.textContent = result + ' руб';
}

//делегирование события клика по кнопкам "минус" и "плюс"
body.addEventListener('click', (event) => {
  event.preventDefault();

  if(event.target.classList.contains('btn-plus')) {
    countPlus(event.target.dataset.index);
  } else if(event.target.classList.contains('btn-minus')) {
    countMinus(event.target.dataset.index);
  }
})

clearCart.addEventListener('click', () => {
  body.innerHTML = '';
  localStorage.removeItem('cart');
  modalCart.classList.remove('is-open');
})

//по клику на кнопку "оформить заказ" данные отправляем на сервер
buttonSend.addEventListener('click', () => {
  const cartArray = localStorage.getItem('cart');

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: cartArray
  })
    .then(response => {
      if(response.ok) {
        resetCart();
      }
    })
    .catch(error => {
      console.error(error);
    })
})

cartButton.addEventListener('click', () => {
  if(localStorage.getItem('cart')) {
  // в renderItems передаем массив с данными для выведения в модальном окне корзины
    renderItems(JSON.parse(localStorage.getItem('cart')));
  }

  modalCart.classList.add('is-open');
})

closeBtn.addEventListener('click', () => {
  modalCart.classList.remove('is-open');
})

}
cart();
'use strict'
const cardsMenu = document.querySelector('.cards-menu');

const changeTitle = (restaurant) => {
  const restaurantTitle = document.querySelector('.restaurant-title');
  const stars = document.querySelector('.rating');
  const price = document.querySelector('.price');
  const category = document.querySelector('.category');


  restaurantTitle.textContent = restaurant.name;  
  stars.textContent = restaurant.stars;  
  price.textContent = `от ${restaurant.price} руб`;
  category.textContent = restaurant.kitchen;  

}
/**Функция добавляет обьект выбранного продукта в localStorage
 * cartItem {} обьект добавленный в корзину,
 * cartArray {} массив с продуктами в корзине,
 */
const addToCart = (cartItem) => {
  const cartArray = localStorage.getItem('cart') ?
  JSON.parse(localStorage.getItem('cart')):[]

  if(cartArray.some((item) => item.id === cartItem.id)) {
    cartArray.map((item) => {
      if(item.id == cartItem.id) {
        item.count++
      }
      return item;
    })
  } else {
    cartArray.push(cartItem);
    }

  localStorage.setItem('cart', JSON.stringify(cartArray));
}
/**Функция отрисовывает карточку продукта 
 * @param {object} data массив данных из localStorage
 */
const renderItems = (data) => {
  data.forEach(({description, id, image, name, price}) => {
    const card = document.createElement('div');

    card.classList.add('card');
    card.innerHTML = `
    <img src="${image}" alt="${name}" class="card-image" />
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title card-title-reg">${name}</h3>
							</div>
							<div class="card-info">
								<div class="ingredients">${description}</div>
							</div>
							<div class="card-buttons">
								<button class="button button-primary button-add-cart">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price-bold">${price} ₽</strong>
							</div>
						</div>
					</div>
    `
  // клик по кнопке "в корзину":
  card.querySelector('.button-card-text').addEventListener('click', () => {
    //создаем обьект продукта, кот. добавлен в корзину

    // const cartItem = {name, price, count: 1}
    // addToCart(cartItem);
    // то же самое что:

    addToCart( {name, price, id, count:1});
  });

    cardsMenu.append(card);
  }) 
}
//если в localStorage есть данные ресторана, то отправляем запрос и выводим меню
if (localStorage.getItem('restaurant')) {
  const restaurant = JSON.parse(localStorage.getItem('restaurant'));

  changeTitle(restaurant);

  fetch(`./db/${restaurant.products}`)
  .then((response) => response.json())
  .then((data) => {
    renderItems(data);
  })
  .catch((error) => {
    console.log(error);
  })
} else {
  window.location.href = '/';
};
 

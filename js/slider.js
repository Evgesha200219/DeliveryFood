
const swiper = new Swiper('.swiper', {
  loop: true,
  observer: true,

  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },

  pagination: {
    el: '.swiper-pagination',
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const pagination = document.querySelectorAll('.swiper-pagination-bullet');
console.log();(pagination);


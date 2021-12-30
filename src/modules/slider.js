const slider = () => {
  
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
}

export default slider
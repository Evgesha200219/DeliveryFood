'use strict';

const btnAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const btnOut = document.querySelector('.button-out');
const userName = document.querySelector('.user-name');
const btnCloseModal = document.querySelector('.close-auth');
const formAuth = document.getElementById('logInForm');
const inputLogin = document.getElementById('login');
const inputPassword = document.getElementById('password');

/**Функция срабатывает при авторизации 
 * btnAuth {} кнопка авторизации
 * btnOut {}кнопка выйти 
 * userName {} имя пользователя
 * user {} обьект с данными пользователя
 */
const login = (user) => {
  btnAuth.style.display = 'none';
  btnOut.style.display = 'block';
  userName.style.display = 'block';
  userName.textContent = user.login;
  modalAuth.style.display = 'none';
}
/**Функция срабатывает при нажатии кнопки Выйти
 * btnAuth {} кнопка авторизации
 * btnOut {}кнопка выйти 
 * userName {} имя пользователя
 * user {} обьект с данными пользователя
 */
const logout = () => {
  btnAuth.style.display = 'flex';
  btnOut.style.display = 'none';
  userName.style.display = 'none';
  userName.textContent = '';

  localStorage.removeItem('user');
}

btnAuth.addEventListener('click', () => {
  modalAuth.style.display = 'flex';//откр. окно авторизации
});

btnOut.addEventListener('click', () => {
  logout();
});

btnCloseModal.addEventListener('click', () => {
  modalAuth.style.display = 'none';
});

formAuth.addEventListener('submit', (event) => {
  event.preventDefault();

    let userLogin = inputLogin.value;
    let userPassword = inputPassword.value;
    
    userLogin = userLogin.trim();
    userPassword = userPassword.trim();

    if (userLogin.lenght == 0 || userPassword == 0) {
      alert('Все поля формы должны быть заполнены!');
    } else {
      const user = {
        login: userLogin,
        password: userPassword
      }
    
      localStorage.setItem('user', JSON.stringify(user));
      login(user);
    }
  });

if(localStorage.getItem('user')) {
  login(JSON.parse(localStorage.getItem('user')));
}
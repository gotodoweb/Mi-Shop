import { openModal, closeModal } from "./modals.js";
import { getData } from "./api.js";

export const authFunc = () => {
  const authBtn = document.getElementById("open-auth-btn");
  const openCartBtn = document.getElementById("open-cart-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const modal = document.getElementById("auth-modal");
  const closeBtns = modal.querySelectorAll(".close-btn");
  const loginBtn = modal.querySelector(".login-btn");
  const cartModal = document.getElementById("cart-modal");

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      closeModal(modal);
    });
  });

  authBtn.addEventListener("click", () => {
    openModal(modal);
  });

  // authorization
  const login = () => {
    authBtn.classList.add("d-none");
    openCartBtn.classList.remove("d-none");
    logoutBtn.classList.remove("d-none");
    closeModal(modal);
  };

  const logout = () => {
    authBtn.classList.remove("d-none");
    openCartBtn.classList.add("d-none");
    logoutBtn.classList.add("d-none");
  };

  // проверяем есть что-то в localstorage при помощи getItem
  const checkAuth = () => {
    const user = JSON.parse(localStorage.getItem("auth"));
    if (user) {
      getData('/profile').then((data) => { 
        if ((data.login && data.login === user.login) && (data.password && data.password === user.password)) {
          login();
        } else {
          alert('Вы ввели неверные данные!')
        }
      });
    } 
  };

  loginBtn.addEventListener("click", () => {
    const loginInput = modal.querySelector("#login-control");
    const passwordInput = modal.querySelector("#password-control");
    // создаем объект пользователя и сохраняем его в localstorage
    const user = {
      login: loginInput.value,
      password: passwordInput.value,
    };
    // теперь можем проверить с данными что ввели в модальном окне - если не совпадают то пишем ошибку
    getData('/profile').then((data) => { 
      if ((data.login && data.login === user.login) && (data.password && data.password === user.password)) {
        localStorage.setItem("auth", JSON.stringify(data));
        console.log(data)
        login();
      } 
    });
  });

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("auth");
    logout();
  });

  // пересено в файл cart.js
  // openCartBtn.addEventListener('click', () => {
  //   openModal(cartModal);    
  // })
  
  checkAuth();
};

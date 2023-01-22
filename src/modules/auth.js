import { openModal, closeModal } from "./modals.js";

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
    // console.log(localStorage.getItem("auth"));
    // или можем развернуть данные - получить объект
    // console.log(JSON.parse(localStorage.getItem("auth")));
    // проверяем существует ли объект - если да то вызываем функцию
    if (JSON.parse(localStorage.getItem("auth"))) {
      login();
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
    // передаем ключ по которому будем сохранять данные user т.е auth - первым аргументом
    // передим объект в строку т.е данные в виде строки - второым аргументом
    localStorage.setItem("auth", JSON.stringify(user));

    login();
  });

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("auth");
    logout();
  });

  openCartBtn.addEventListener('click', () => {
    openModal(cartModal);    
  })
  
  checkAuth();
};

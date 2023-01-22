const authBtn = document.getElementById("open-auth-btn");
const modal = document.getElementById("auth-modal");
const closeBtns = modal.querySelectorAll(".close-btn");
// console.log("closeBtns: ", closeBtns);

const openModal = () => {
  modal.style.display = "block";
  setTimeout(() => {
    modal.classList.add("show");
  }, 300);
};

const closeModal = () => {
  modal.classList.remove("show");
    setTimeout(() => {
    modal.style.display = "none";    
  }, 500);
};

closeBtns.forEach((btn) => {
  btn.addEventListener("click", closeModal);
});

authBtn.addEventListener("click", openModal);

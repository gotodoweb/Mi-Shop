export const openModal = (modal) => {

  // создаем блок 
  const layout = document.createElement(div);
  layout.classList.add('modal-backdrop');
  layout.classList.add('fade');
  document.body.append(layout);
  

  modal.classList.add("d-block");

  setTimeout(() => {
    modal.classList.add("show");
  }, 200);
};

export const closeModal = (modal) => {
  modal.classList.remove("show");

  setTimeout(() => {
    modal.classList.remove("d-block");
  }, 400);
};


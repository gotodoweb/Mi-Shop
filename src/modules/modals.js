export const openModal = (modal) => {

  // создаем блок 
  // const layout = document.createElement('div');
  // layout.classList.add('modal-backdrop');
  // layout.classList.add('fade');
  // document.body.append(layout);
  document.body.insertAdjacentHTML('beforeend', `
    <div class="modal-backdrop fade"></div>
  `);

  modal.classList.add("d-block");

  setTimeout(() => {
    const layout = document.querySelector('.modal-backdrop');
    layout.classList.add("show");
    modal.classList.add("show");
  }, 200);
};

export const closeModal = (modal) => {
  const layout = document.querySelector('.modal-backdrop');
  layout && layout.classList.remove("show");

  modal.classList.remove("show");

  setTimeout(() => {
    modal.classList.remove("d-block");
    layout && layout.remove();

  }, 400);
};


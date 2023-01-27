import { postData, getData, deleteData } from "../api";

export const addCategory = () => {
  const nameInp = document.getElementById("category-name");
  const previewInp = document.getElementById("category-image");
  const saveBtn = document.getElementById("category-add-btn");
  const container = document.getElementById("category-container");
  const select = document.getElementById('product-category');

  const categoryData = {
    name: "",
    preview: "",
  };

  // формируем строки в таблице -  копируем render из cart.js и заменяем верстку
  const render = (data) => {
    // чистим контейнер перед тем как запускаем функцию render
    container.innerHTML = "";

    data.forEach((item, index) => {
      // console.log(item);
      container.insertAdjacentHTML(
        "beforeend",
        `
        <tr>
          <th scope="row">${index + 1}</th>
          <td>${item.name}</td>
          <td class="text-end">
              <button type="button" class="btn btn-outline-danger btn-sm" data-category="${item.id}">
                  удалить
              </button>
          </td>
        </tr>

        `
      );
      select.insertAdjacentHTML('beforeend', `
        <option value="${item.id}">${item.name}</option>
      `)
    });
  };

  const checkValues = () => {
    if (nameInp.value === "" || previewInp.value === "") {
      saveBtn.disabled = true;
    } else {
      saveBtn.disabled = false;
    }
  };

  const updateTable = () => {
    getData("/categories").then((data) => {
      // console.log(data);
      render(data);
    });
  }

  nameInp.addEventListener("input", () => {
    categoryData.name = nameInp.value;
    checkValues();
  });

  previewInp.addEventListener("input", () => {
    const file = previewInp.files[0];
    // console.log(previewInp.files);
    // console.log(file.type);

    if (
      file.type === "image/png" ||
      file.type === "image/jpeg" ||
      file.type === "image/jpg"
    ) {
      const reader = new FileReader();

      reader.onload = () => {
        categoryData.preview = reader.result;
      };

      reader.onerror = () => {
        categoryData.preview = "";
        previewInp.value = "";
      };

      reader.readAsDataURL(file);
    } else {
      previewInp.value = "";
    }

    checkValues();
  });

  saveBtn.addEventListener("click", () => {
    // console.log(categoryData);
    postData("/categories", {
      method: "POST",
      body: JSON.stringify(categoryData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      nameInp.value = ""
      previewInp.value = ''
      updateTable();
    });
  });

  container.addEventListener('click', (event) => {
    // console.dir(event.target);
    if (event.target.tagName === 'BUTTON') {
      console.log(event.target);
      const id = event.target.dataset.category;
      console.log(id);
      deleteData(`/categories/${id}`).then((data) => {
        updateTable();
      });
    }
  })

  updateTable();
  checkValues();
};

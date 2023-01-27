const apiPath = 'http://localhost:3001';


export const getData = (path) => {
  return fetch(apiPath + path).then(response => {
    if(!response.ok) {
      throw new Error;
    }
    return response.json();
  })
}

//осталось эксопртировать данные на сохранение
export const postData = (path, data) => {
  return fetch(apiPath + path, data).then(response => {
    if(!response.ok) {
      throw new Error;
    }
    return response.json();
  })
}

// удаляем по id из БД
export const deleteData = (path) => {
  return fetch(apiPath + path, {
    method: 'DELETE'
  }).then(response => {
    if(!response.ok) {
      throw new Error;
    }
    return response.json();
  })
}
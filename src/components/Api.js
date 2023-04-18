

export class Api {
  // класс для работы с сервером
  constructor({ baseUrl, headers }) {
    // конструктор получает ссылку на сервер и заголовок
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // метод проверяет запрос
  // возвращает либо промис с выполненной задачей, либо ошибку
  _checkStatusResponse(res) {
    return res.ok
      ? res.json()
      : Promise.reject(`Ошибка в ${res.status}`);
  }

  // получаю от сервера массив карточек
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._checkStatusResponse(res);
    });
  }

  // метод получения информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._checkStatusResponse(res);
    });
  }

  // метод редактирования профиля пользователя на сервере
  setUserInfoProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH", // метод для частичного обновления ресурса на сервере
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      }),
    }).then((res) => {
      return this._checkStatusResponse(res);
    });
  }

  // метод добавления новой карточки на сервере
  createNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    }).then((res) => {
      return this._checkStatusResponse(res);
    });
  }

  // метод получения лайков на сервере
  addlikeCard(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      return this._checkStatusResponse(res);
    });
  }

  // метод удаления карточки на сервере
  deleteCard(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._checkStatusResponse(res);
    });
  }

  // метод обновления аватара на сервере
  editUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => {
      return this._checkStatusResponse(res);
    });
  }

  // метод снятия лайка на карточке на сервере
  deleteCardLike(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      return this._checkStatusResponse(res);
    });
  }
}

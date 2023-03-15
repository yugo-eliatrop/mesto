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
  setUserInfoProfile({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH", // метод для частичного обновления ресурса на сервере
      headers: this._headers,
      body: JSON.stringify({
        dataName: name,
        dataAbout: about
      }),
    }).then((res) => {
      return this._checkStatusResponse(res);
    });
  }

  // метод добавления новой карточки на сервере
  addNewCard({ placeName, linkPicture }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: placeName,
        link: linkPicture,
      }),
    }).then((res) => {
      return this._checkStatusResponse(res);
    });
  }

  // метод получения лайков на сервере
  addlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      return this._checkStatusResponse(res);
    });
  }

  // метод удаления карточки на сервере
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._checkStatusResponse(res);
    });
  }

  // метод обновления аватара на сервере
  editUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        dataAvatar: avatar,
      }),
    }).then((res) => {
      return this._checkStatusResponse(res);
    });
  }

  // метод снятия лайка на карточке на сервере
  deleteCardLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      return this._checkStatusResponse(res);
    });
  }
}

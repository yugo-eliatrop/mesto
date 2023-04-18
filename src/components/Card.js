export default class Card {

  constructor(
    cardData,
    templateSelector,
    handleCardClick,
    handleCardDeleteClick,
    handleCardLike,
    userId
    ) {
    // принимаю в конструктор данные карточки,
    // селектор темплэйта и функцию открытия карточки
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick; // открыть карточку
    this._handleCardDeleteClick = handleCardDeleteClick; // удалить карточку
    this._handleCardLike = handleCardLike;
    this._userId = userId; // айдишник того, кто добавил карточку
    this._likes = cardData.likes; // массив лайков для отображения количества лайков
    this._like = false; // состояние лайков
    this._ownerId = cardData.owner._id; // айди чужих карточек
    this._id = cardData._id; // айди всех карточек
  }

  // получаю данные из разметки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__card')
      .cloneNode(true);

    return cardElement;
  }

  // метод подсчета лайков
  /* countLikes(response) {
    this._countLikes.textContent = `${response._likes.length}`;
  } */

  countLikes(newLike) {
    this._likes = newLike;
    this._countLikes.textContent = this._likes.length;
  }

  // метод добавления лайка
  setLike() {
    this._buttonLike.classList.add('elements__like-button_active');
  }

  // метод удаления лайка
  removeLike() {
    this._buttonLike.classList.remove('elements__like-button_active');
  }

  // метод, меняющий состояние лайка,
  // изначально задан false
  toggleLikeState() {
    this._like = !this._like;
  }

  get like() {
    return this._like;
  }

  handleCardDelete() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._cardImage = this._element.querySelector('.elements__card-image');
    this._buttonLike = this._element.querySelector('.elements__like-button');
    this._cardDeleteButton = this._element.querySelector('.elements__delete-button');

    this._countLikes = this._element.querySelector('.elements__like-number');
    // передаю в свойство массива лайков цифру
    this._countLikes.textContent = this._likes.length;

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    // измененный слушатель лайка
    this._buttonLike.addEventListener('click', () => {
      this._handleCardLike(this);
    });

    this._cardDeleteButton.addEventListener('click', () => {
      this._handleCardDeleteClick(this);
    });

    // если не конретный пользователь добавил карточку, убираю кнопку удаления
    // так как нельзя удалять чужие карточки
    if (this._userId !== this._ownerId) {
      this._cardDeleteButton.remove();
    }

    if (this._id.like) {
      this.setLike();
    } else {
      this.removeLike();
    }
  }

  // подготавливаю карточки к публикации
  createCard() {
    // записываю в разметку приватное поле _element
    this._element = this._getTemplate();
    this._setEventListeners();

    this._cardText = this._element.querySelector('.elements__card-text');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardText.textContent = this._name;

    // возвращаю карточку наружу
    return this._element;
  }
}

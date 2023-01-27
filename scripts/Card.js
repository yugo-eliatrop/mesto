
export default class Card {

  constructor(cardData, templateSelector, openPopupImages) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._openPopupImages = openPopupImages;
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

  _handleCardLike() {
    this._buttonLike.classList.toggle('elements__like-button_active');
  }

  _handleCardDelete() {
    this._element.remove();
    this._element = '';
  }

  _setEventListeners() {
    this._cardImage = this._element.querySelector('.elements__card-image');
    this._buttonLike = this._element.querySelector('.elements__like-button');
    this._cardDeleteButton = this._element.querySelector('.elements__delete-button');

    this._cardImage.addEventListener('click', () => {
      this._openPopupImages(this._name, this._link);
    });

    this._buttonLike.addEventListener('click', () => {
      this._handleCardLike();
    });

    this._cardDeleteButton.addEventListener('click', () => {
      this._handleCardDelete();
    });
  }

  // подготавливаю карточки к публикации
  createCard() {
    // записываю в разметку приватное поле _element
    this._element = this._getTemplate();
    this._setEventListeners();

    this._cardImage = this._element.querySelector('.elements__card-image');
    this._cardText = this._element.querySelector('.elements__card-text');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardText.textContent = this._name;

    // возвращаю карточку наружу
    return this._element;
  }
}

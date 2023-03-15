import { Popup } from "./Popup.js";

export class PopupConfirmation extends Popup {
  constructor({ popupSelector, handleSubmitForm }) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._handleSubmitForm = handleSubmitForm;
    this._submitConfirmBtn = this._popupElement.querySelector('.popup__save-button');
  }

  handleCard(cardElement) {
    // вызываю родительский метод
    /* super.open(); */
    // нахожу карточку
    this._cardElement = cardElement;
    // нахожу айди карточки, которую нужно удалить
    /* this._id = id; */
  }

  // устанавливаю обработчик сабмита попапа подтверждения
  setEventListeners() {
    super.setEventListeners();
    this._submitConfirmBtn.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._cardElement);
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
 }

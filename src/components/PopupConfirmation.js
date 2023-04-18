
import { Popup } from "./Popup.js";

export class PopupConfirmation extends Popup {
  constructor({ popupSelector, handleSubmitForm }) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._handleSubmitForm = handleSubmitForm;
    this._submitConfirmBtn = this._popupElement.querySelector('.popup__save-button');
  }

  // метод отслеживания карточки, что нажали на урну
  handleCard(newCard) {
    this._newCard = newCard;
  }

  // устанавливаю обработчик сабмита попапа подтверждения
  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleSubmitForm(this._newCard)
    });
  }
 }

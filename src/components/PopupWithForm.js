import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {

  constructor({ popupSelector, handleSubmitForm }) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._formElement = this._popupElement.querySelector('.popup__form');
  }

  _getInputValues() {
    this._inputList = this._popupElement.querySelectorAll('.popup__input');
    // создаю переменную с пустым объектом
    const inputValues = {};
    this._inputList.forEach(inputElement => {
      // получаю данные с инпутов и кладу в объект
      inputValues[inputElement.name] = inputElement.value;
    });
    // возвращаю данные в виде объекта
    return inputValues;
  }

  setEventListeners() {
    // перезаписываю родительский метод
    super.setEventListeners();
      this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleSubmitForm(this._getInputValues());
    });
  }

  close() {
    // перезаписываю родительский метод закрытия попапа
    super.close();
    // сбрасываю форму при закрытии попапа
    this._formElement.reset();
  }
}

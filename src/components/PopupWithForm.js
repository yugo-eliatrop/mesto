import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {

  constructor({ popupSelector, handleSubmitForm }) {
    // конструктор принимает селектор попапа
    // и колбэк сабмита формы
    super(popupSelector);
    // вызываю родительский конструктор
    this._handleSubmitForm = handleSubmitForm;
    this._formElement = this._popupElement.querySelector('.popup__form');
    // достаю все элементы полей
    this._inputList = this._formElement.querySelectorAll('.popup__input');
  }

  // метод собирает массив всех полей формы
  _getInputValues() {
    // создаю пустой объект
    this._formValues = {};

    this._inputList.forEach(input => {
      // добавляю в этот объект значения всех полей
      this._formValues[input.name] = input.value;
    });

    // возвращаю данные в виде объекта
    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    // перезаписываю родительский метод
    super.setEventListeners();
      this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        // добавляю вызов функции _handleSumitForm
        // передаю ей объект - результат работы
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

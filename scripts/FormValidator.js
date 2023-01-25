
export class FormValidator {

  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
    this._formSelector = validationConfig.formSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inputSelector = validationConfig._inputSelector;
    this._inputErrorClass = validationConfig._inputErrorClass;
    this._errorClass = validationConfig.errorClass;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
  }

  // универсальная функция, показывающая валидность или не валидность инпутов
  _checkInputValidity (formElement, inputElement) {
  // переменная, содержащая валидность инпута
   const isValid = inputElement.validity.valid;

    if (isValid) {
      // если инпут валиден, то спрячю ошибку
      this._hideInputError(formElement, inputElement);
    } else {
      // если не валиден, то показываю ошибку
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    }
  };

  _showInputError (formElement, inputElement, errorMessage) {
    // выбираю элемент ошибки на основе уникального класса
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    // инпуту добавляю тип ошибки
    inputElement.classList.add(this._inputErrorClass);
    // ошибке передаю текст сообщения
    errorElement.textContent = errorMessage;
    // ошибке добавляю класс ошибки
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError (formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    // у инпута убираю тип ошибки
    inputElement.classList.remove(this._inputErrorClass);
    // убираю текст ошибки
    errorElement.textContent = "";
    // убираю класс ошибки
    errorElement.classList.remove(this._errorClass);
  };

  // метод содержит в себе то, что имеет невалидный инпут
  // если какой-нибудь инпут невалидный, вернет true методом some
  _hasInvalidInput() {
    this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  // функция переключения состояния кнопки
  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      // если хотя бы один инпут невалидный, кнопка заблокируется
      this._submitButton.setAttribute('disabled', true);
      this._submitButton.classList.add(this._inactiveButtonClass);
    } else {
      // если все инпуты валидны, кнопка разблокируется
      this._submitButton.removeAttribute('disabled');
      this._submitButton.classList.remove(this._inactiveButtonClass);
    }
  };

  // накладываю слушателя на формы
  _setEventListeners () {
    // нахожу у формы инпуты и кнопку сабмит
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    // вызываю кнопку изначально, которая сама себя проверит,
    // если есть невалидный инпут, кнопка заблокируется
    this._toggleButtonState();

    // на каждый инпут навешиваю слушателя
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        // вызываю функцию, проверяющую инпут на валидность
        this._checkInputValidity(formElement, inputElement);
        // вызываю функцию разблокировки кнопки при валидности всех инпутов
        this.toggleButtonState();
      });
    });
  };

  // функция запуска валидации
  enableValidation () {
      this._setEventListeners();
  };
};

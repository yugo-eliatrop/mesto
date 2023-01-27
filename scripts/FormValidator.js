
export class FormValidator {

  constructor(validationConfig, formElement) {
    // в конструкторе получаю объект валидации и форму, далее работаю с формой
    this._formElement = formElement;
    // присваиваю селекторы из объекта валидации контексту this
    this._formSelector = validationConfig.formSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
  }

  // универсальная функция, показывающая валидность или не валидность инпутов
  _checkInputValidity (inputElement) {
  // переменная, содержащая валидность инпута
   const isValid = inputElement.validity.valid;

    if (isValid) {
      // если инпут валиден, то спрячю ошибку
      this._hideInputError(inputElement);
    } else {
      // если не валиден, то показываю ошибку
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  };

  _showInputError (inputElement, errorMessage) {
    // выбираю элемент ошибки на основе уникального класса
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    // инпуту добавляю тип ошибки
    inputElement.classList.add(this._inputErrorClass);
    // ошибке передаю текст сообщения
    errorElement.textContent = errorMessage;
    // ошибке добавляю класс ошибки
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    // у инпута убираю тип ошибки
    inputElement.classList.remove(this._inputErrorClass);
    // убираю текст ошибки
    errorElement.textContent = "";
    // убираю класс ошибки
    errorElement.classList.remove(this._errorClass);
  };

  // метод содержит наличие инпутов с ошибками
  // если какой-нибудь инпут невалидный, вернет true методом some
  _hasInvalidInput () {
    // возвращаю наружу коллекцию невалидных инпутов
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // метод отключения кнопки сабмита
  disableSubmitButton () {
    // если хотя бы один инпут невалидный, кнопка заблокируется
    this._submitButton.disabled = true;
    this._submitButton.classList.add(this._inactiveButtonClass);
  };

  // метод включения кнопки сабмита
  activeSubmitButton () {
    // если все инпуты валидны, кнопка разблокируется
    this._submitButton.disabled = false;
    this._submitButton.classList.remove(this._inactiveButtonClass);
  };

  // метод переключения состояния кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      //если инпут невалидный, блокирую кнопку сабмита
      this.disableSubmitButton();
    } else {
      //если инпуты валидны, активирую кнопку сабмита
      this.activeSubmitButton();
    }
  };

  // накладываю слушателя на формы
  _setEventListeners() {
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
        this._checkInputValidity(inputElement);
         // вызываю функцию разблокировки кнопки при валидности всех инпутов
         this._toggleButtonState();
      });
    });
  };

  // функция запуска валидации
  enableValidation () {
      this._setEventListeners();
  };
};

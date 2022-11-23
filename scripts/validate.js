// объект настроек для функций
const obj = {
  formElement: '.popup__form',
  inputElement: '.popup__input',
  submitButton: '.popup__save-button',
  inactiveButton: 'popup__save-button_disabled',
  inputErrorElement: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
};

const formList = document.querySelector('.popup__form');
const inputList = Array.from(formList.querySelectorAll('.popup__input'));
const submitButton = Array.from(formList.querySelectorAll('.popup__save-button'));

// функция показывающая сообщения об ошибках, если поля не валидны
const showInputError = (inputErrorElement, errorClass, errorMessage) => {
  inputErrorElement.classList.add('popup__input_type_error');
  inputErrorElement.textContent = errorMessage;
  errorClass.classList.add('popup__input-error_visible');
};

// функция скрывающая сообщения об ошибках, если поля валидны
const hideInputError = (inputErrorElement, errorClass) => {
  errorClass.classList.remove('popup__input_type_error');
  inputErrorElement.textContent = '';
  inputErrorElement.classList.remove('popup__input-error_visible');
};

// универсальная функция, проверяющая валидность или невалидность заполненных полей
const checkInputValidity = (inputElement) => {
  // проверяю валидность инпута
  const isValid = inputElement.validity.valid;
  // нахожу ошибку инпута по уникальному классу
  const inputErrorElement = formElement.querySelector(`.${inputElement.id}-error_visible`);

  if (isValid) {
    // если инпут валиден, скрываю ошибку
    hideInputError(inputErrorElement);
  } else {
    showInputError(inputErrorElement, inputElement.validationMessage);
  }
};

const toggleSubmitButtonState = (inputList, submitButton) => {
  const hasInvalidInput = inputList.some(
    (inputElement) => !inputElement.validity.valid
  );

  if (hasInvalidInput) {
    submitButton.removeAttribute('disabled');
    submitButton.classList.remove('popup__save-button_disabled');
  } else {
    submitButton.setAttribute('disabled', true);
    submitButton.classList.add('popup__save-button_disabled');
  }
};

const setEventListeners = (formElement) => {
  formElement.addEventListener('submit', (evt) => {
    console.log(formElement);
    evt.preventDefault();
  });

  toggleSubmitButtonState(inputList, submitButton);

  // Обхожу все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавляю обработчик события input
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement);
      toggleSubmitButtonState(inputList, submitButton);
    });
  });
};

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const enableValidation = ({
  formSelector,
  inputSelector,
  submitButton,
  inactiveButton,
  errorElement,
  errorClass,
}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation(obj);

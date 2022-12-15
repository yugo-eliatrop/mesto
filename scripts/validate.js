// универсальная функция, показывающая валидность или не валидность инпутов
const checkInputValidity = (formElement, inputElement, rest) => {
  // переменная сожержащая валидность инпута
  const isValid = inputElement.validity.valid;

  if (isValid) {
    // если инпут валиден, то спрячю ошибку
    hideInputError(formElement, inputElement, rest);
  } else {
    // если не валиден, то показываю ошибку
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      rest
    );
  }
};

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  { inputErrorClass, errorClass }
) => {
  // выбираю элемент ошибки на основе уникального класса
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  // инпуту добавляю тип ошибки
  inputElement.classList.add(inputErrorClass);
  // ошибке передаю текст сообщения
  errorElement.textContent = errorMessage;
  // ошибке добавляю класс ошибки
  errorElement.classList.add(errorClass);
};

const hideInputError = (
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  // у инпута убираю тип ошибки
  inputElement.classList.remove(inputErrorClass);
  // убираю текст ошибки
  errorElement.textContent = "";
  // убираю класс ошибки
  errorElement.classList.remove(errorClass);
};

// функция переключения состояния кнопки
const toggleButtonState = (inputList, submitButton, inactiveButtonClass) => {
  // переменная содержит в себе то, что имеет невалидный инпут
  // если какой-нибудь инпут невалидный, вернет true методом some
  const hasInvalidInput = inputList.some(
    (inputElement) => !inputElement.validity.valid
  );

  if (hasInvalidInput) {
    // если хотя бы один инпут невалидный, кнопка заблокируется
    submitButton.setAttribute("disabled", true);
    submitButton.classList.add(inactiveButtonClass);
  } else {
    // если все инпуты валидны, кнопка разблокируется
    submitButton.removeAttribute("disabled");
    submitButton.classList.remove(inactiveButtonClass);
  }
};

// накладываю слушателя на формы
const setEventListeners = (
  formElement,
  { inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }
) => {
  formElement.addEventListener("submit", (evt) => {
    // сбрасываю дефолтное состояние сабмиту формы
    evt.preventDefault();
  });
  // нахожу у этой формы инпуты и кнопку сабмит
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitButton = formElement.querySelector(submitButtonSelector);
  // вызываю кнопку изначально, которая сама себя проверит,
  // если есть невалидный инпут, кнопка заблокируется
  toggleButtonState(inputList, submitButton, inactiveButtonClass);

  // на каждый инпут навешиваю слушателя
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      // вызываю функцию, проверяющую инпут на валидность
      checkInputValidity(formElement, inputElement, rest);
      // вызываю функцию разблокировки кнопки при валидности всех инпутов
      toggleButtonState(inputList, submitButton, inactiveButtonClass);
    });
  });
};

// функция запуска валидации
const enableValidation = ({ formSelector, ...rest }) => {
  // нахожу все формы на странице
  const formList = Array.from(document.querySelectorAll(formSelector));
  // на каждую форму навешиваю слушателя
  formList.forEach((formElement) => {
    setEventListeners(formElement, rest);
  });
};

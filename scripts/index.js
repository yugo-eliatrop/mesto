const popup = document.querySelector('.popup');
const openButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close');

const openPopup = function () {
  popup.classList.add('popup_opened');
}

const closePopup = function () {
  popup.classList.remove('popup_opened');
}

openButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__name');
const jobInput = document.querySelector('.popup__data');

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameInput.getAttribute('value');
  jobInput.getAttribute('value');
  const nameInputNew = nameInput.getAttribute('value');
  const jobInputNew = jobInput.getAttribute('value');
  nameInput.textContent = nameInputNew;
  jobInput.textContent = jobInputNew;
}

formElement.addEventListener('submit', formSubmitHandler);

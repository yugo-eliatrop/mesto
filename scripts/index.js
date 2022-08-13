const popup = document.querySelector('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');

const openPopup = function () {
  popup.classList.add('popup_opened');
}

const closePopup = function () {
  popup.classList.remove('popup_opened');
}

openButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__data');
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

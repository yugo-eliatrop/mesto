const popup = document.querySelector('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__data');
const jobInput = document.querySelector('.popup__data');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const openPopup = function () {
  popup.classList.add('popup_opened');
  nameInput.textContent = nameInput;
  jobInput.textContent = jobInput;
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameInput.value = profileTitle;
  jobInput.value = profileSubtitle;
  nameInput.textContent = profileTitle;
  jobInput.textContent = profileSubtitle;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', openPopup);
formElement.addEventListener('submit', formSubmitHandler);
popupCloseButton.addEventListener('click', closePopup);

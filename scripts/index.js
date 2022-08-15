const popup = document.querySelector('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__data');
const jobInput = document.querySelector('.popup__data');

const openPopup = function () {
  popup.classList.add('popup_opened');
  nameInput.setAttribute('popup__data', value);
  jobInput.setAttribute('popup__data', value);
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  const profileTitle = document.querySelector('.profile__title');
  const profileSubtitle = document.querySelector('.profile__subtitle');
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

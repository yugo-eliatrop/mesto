const popup = document.querySelector('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_data_name[name=first-name]');
const jobInput = document.querySelector('.popup__input_data_name[name=employment]');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const openPopup = function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  popup.classList.add('popup_opened');
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

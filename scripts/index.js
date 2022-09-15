
const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup__profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_data_name');
const jobInput = document.querySelector('.popup__input_data_profession');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileAddButton = document.querySelector('.profile__add-button');
const popupNewPlaces = document.querySelector('.popup__elements');
const namePlace = document.querySelector('.popup__input_data_place');
const linkImage = document.querySelector('.popup__input_link_image');
const elementsCardText = document.querySelector('.elements__card-text');
const elementsCardImage = document.querySelector('.elements__card-image');

console.log(popup);
console.log(popupProfile);
console.log(profileEditButton);
console.log(popupCloseButton);
console.log(formElement);
console.log(nameInput);
console.log(jobInput);
console.log(profileTitle);
console.log(profileSubtitle);
console.log(profileAddButton);
console.log(popupNewPlaces);
console.log(namePlace);


function openPopup (popupElement) {
  popupElement.classList.add('popup_opened');
}

const openEditPopup = function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupProfile);
}

function openAddPopup() {
  openPopup(popupNewPlaces);
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupProfile);
}

function handleSubmit (evt) {
  evt.preventDefault();
  elementsCardText.textContent = namePlace.value;
  elementsCardImage.textContent = linkImage.value;
  closePopup(popupNewPlaces);
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', openEditPopup);
formElement.addEventListener('submit', formSubmitHandler);

popupCloseButton.addEventListener('click', function () {
 closePopup(popupProfile);
})

profileAddButton.addEventListener('click', openAddPopup);
formElement.addEventListener('submit', handleSubmit);

popupCloseButton.addEventListener('click', function () {
 closePopup(popupNewPlaces);
})


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
const ButtonLikeActive = document.querySelector('.elements__like-button_active');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const templateElement = document.querySelector('.template-elements');
const popupImages = document.querySelector('.popup__images');
const ButtonPopupImages = document.querySelector('.popup__images-button')
const popupImageContent = document.querySelector('.popup__image');
const popupFigcaption = document.querySelector('.popup__figcaption');


function openPopup (popupElement) {
  popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

function openEditPopup() {
  console.log('openEditPopup')
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupProfile);
}

function openAddPopup() {
  openPopup(popupNewPlaces);
}

function handleSubmitEditForm (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupProfile);
}

function handleSubmitAddForm (evt) {
  evt.preventDefault();
  elementsCardText.textContent = namePlace.value;
  elementsCardImage.textContent = linkImage.value;
  closePopup(popupNewPlaces);
}

profileEditButton.addEventListener('click', openEditPopup);
formElement.addEventListener('submit', handleSubmitEditForm);

popupCloseButton.addEventListener('click', closePopup(popupProfile));

profileAddButton.addEventListener('click', openAddPopup);
formElement.addEventListener('submit', handleSubmitAddForm);

popupCloseButton.addEventListener('click', closePopup(popupNewPlaces));

// функция открытия попапа картнки
function openPopupImages(name, url) {
  console.log('openPopupImages', name, url)
  popupImageContent.src = url;
  popupImageContent.alt = name;
  popupFigcaption.textContent = name;
  openPopup(popupImages);
}

// функция добавления карточек и лайка
function createCards() {
  const newCardElements = templateElement.content.cloneNode(true);
  newCardElements.querySelector('.elements__card-text').textContent = name;
  newCardElements.querySelector('.elements__card-image').src = link;
  newCardElements.querySelector('.elements__like-button_active').alt = name;
}

initialCards.forEach(createCards);
createCards.prepend(newCardElements);

// функция добавления и удаления лайка
function toggleLikeButton() {
  newCardElements.querySelector('.elements__like-button_active').alt = name;
  newCardElements.classList.toggle();
}

// функция закрытия карточки
function deleteCards() {
  newCardElements
   .querySelector('.elements__delete-button_active')
   .addEventListener('click', (evt) => {
    const CardElements = evt.target.closest('.elements__card');
    CardElements(remove);
   })
}

ButtonPopupImages.addEventListener('click', openPopupImages);
popupCloseButton.addEventListener('click', function () {
  closePopup(popupImages);
})
ButtonLikeActive.addEventListener('click', toggleLikeButton);

// обработчик клика навешиваю на картинку в каждой карточке
//cardImage.addEventListener('click', () =>
//handlePreviewPicture(link, name)
//);

// попапы
const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_content_profile');
const popupPlace = document.querySelector('.popup_content_elements');
const popupImages = document.querySelector('.popup_content_images');

// кнопки открытия попапов
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

// кнопки закрытия попапов и удаления карточек
const popupEditCloseButton = popupProfile.querySelector('.popup__close-button');
const popupAddCloseButton = popupPlace.querySelector('.popup__close-button');
const popupImageCloseButton = popupImages.querySelector('.popup__close-button');
const cardDeleteButton = document.querySelector('.elements__delete-button');

// форма добавления данных
const formEditElement = popupProfile.querySelector('.popup__form');
const nameInput = popupProfile.querySelector('.popup__input_data_name');
const jobInput = popupProfile.querySelector('.popup__input_data_profession');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

// форма добавления новых карточек
const formNewCardElement = popupPlace.querySelector('.popup__form');
const namePlace = popupPlace.querySelector('.popup__input_data_place');
const linkImage = popupPlace.querySelector('.popup__input_link_image');
const cardText = document.querySelector('.elements__card-text');
const cardImage = document.querySelector('.elements__card-image');

// данные для работы с тегом template
const templateElement = document.querySelector('.template__elements').content;
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
const popupImageContent = document.querySelector('.popup__image');
const popupFigcaption = document.querySelector('.popup__figcaption');
const cardElements = document.querySelector('.elements__card');

function openPopup (popupElement) {
  popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

function openEditPopup() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupProfile);
}

function openAddPopup() {
  openPopup(popupPlace);
}

function handleSubmitEditForm (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupProfile);
}

// функция добавления карточек
function handleSubmitAddForm (evt) {
  evt.preventDefault();
  const data = {name: namePlace.value, link: linkImage.value};
  const newCard = createCard(data);
  cardContainer.prepend(newCard);
  closePopup(popupPlace);
}

// создаю пустой контейнер, чтобы вложить карточки в секцию elements
const cardContainer = document.querySelector('.elements__cards');

// функция открытия попапа картнки
function openPopupImages(name, link) {
  popupImageContent.src = link;
  popupImageContent.alt = name;
  popupFigcaption.textContent = name;
  openPopup(popupImages);
 }

// функция добавления и удаления карточек, и - лайка
function createCard(cardData) {
  const {link, name} = cardData;
  const newCardElement = templateElement.cloneNode(true);
  console.log(templateElement);
  newCardElement.querySelector('.elements__card-text').textContent = name;
  const cardImageElement = newCardElement.querySelector('.elements__card-image');
  cardImageElement.src = link;
  cardImageElement.alt = name;
  const cardImage = newCardElement.querySelector('.elements__card-image');
  cardImage.addEventListener('click', () => {
    openPopupImages(name, link);
  });
  const buttonLike = newCardElement.querySelector('.elements__like-button');
  buttonLike.addEventListener('click', () => {
    buttonLike.classList.toggle('elements__like-button_active');
  });
  const cardDeleteButton = newCardElement.querySelector('.elements__delete-button');
  cardDeleteButton.addEventListener('click', (evt) => {
    const cardElements = evt.target.closest('.elements__card');
    cardElements.remove();
  });
  return newCardElement;
  }

initialCards.forEach(data => {
  const newCard = createCard(data)
cardContainer.prepend(newCard);
});

// обработчики на открытие попапов
profileEditButton.addEventListener('click', openEditPopup);
profileAddButton.addEventListener('click', openAddPopup);

// обработчики на сабмиты
formEditElement.addEventListener('submit', handleSubmitEditForm);
formNewCardElement.addEventListener('submit', handleSubmitAddForm);

// обработчики на закрытие попапов
popupEditCloseButton.addEventListener('click', () => {
 closePopup(popupProfile);
})

popupAddCloseButton.addEventListener('click', () => {
 closePopup(popupPlace);
})

popupImageCloseButton.addEventListener('click', () => {
  closePopup(popupImages);
})

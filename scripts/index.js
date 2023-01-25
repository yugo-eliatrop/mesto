
import Card from "./Card.js";
import { FormValidator } from "./FormValidator.js";

// попапы
const popupProfile = document.querySelector('.popup_content_profile');
const popupPlace = document.querySelector('.popup_content_elements');
const popupImages = document.querySelector('.popup_content_images');

// кнопки открытия попапов
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

// кнопки закрытия попапов
/* const popupEditCloseButton = popupProfile.querySelector('.popup__close-button');
const popupAddCloseButton = popupPlace.querySelector('.popup__close-button');
const popupImageCloseButton = popupImages.querySelector('.popup__close-button'); */
const popupButtonCloseList = document.querySelectorAll('.popup__close-button');

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
//const templateElement = document.querySelector('.template__elements').content;
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

const cardElement = document.querySelector('.elements__card');
const popupImageContent = document.querySelector('.popup__image');
const popupFigcaption = document.querySelector('.popup__figcaption');

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  // навешиваю обработчик на закрытие открытого попапа по кнопке
  document.addEventListener('keydown', closeByEsc);
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  // удаляю обработчик
  document.removeEventListener('keydown', closeByEsc);
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
  const button = evt.submitter;
  button.disabled = true;
  button.classList.add('popup__save-button_disabled');
  formNewCardElement.reset();
}

// функция открытия попапа картинки
function openPopupImages(name, link) {
  popupImageContent.src = link;
  popupImageContent.alt = name;
  popupFigcaption.textContent = name;
  openPopup(popupImages);
 }

// создаю пустой контейнер, чтобы вложить карточки в секцию elements
const cardContainer = document.querySelector('.elements__cards');

// функция создания карточек
/* function createCard(cardData) {
  const {link, name} = cardData;
  const newCardElement = templateElement.querySelector('.elements__card').cloneNode(true);
  newCardElement.querySelector('.elements__card-text').textContent = name;
  const cardImageElement = newCardElement.querySelector('.elements__card-image');
  cardImageElement.src = link;
  cardImageElement.alt = name;
  cardImageElement.addEventListener('click', () => {
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
  }); */

  // функция добавления карточек с помощью Card.js
  initialCards.forEach((cardData) => {
    // создаю экземпляр карточки
    const newCard = new Card(cardData, '.template__elements', openPopupImages);
    // создаю карточку и возвращаю наружу
    const cardElement = newCard.createCard();
    // добавляю карточки в DOM
    cardContainer.prepend(cardElement);
  });

// обработчики на открытие попапов
profileEditButton.addEventListener('click', openEditPopup);
profileAddButton.addEventListener('click', openAddPopup);

// обработчики на сабмитные кнопки
formEditElement.addEventListener('submit', handleSubmitEditForm);
formNewCardElement.addEventListener('submit', handleSubmitAddForm);

// обработчик на закрытие попапов по клику мыши на крестик
popupButtonCloseList.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup));
})

// функция закрытия попапов по клику на кнопку Escape
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

// навешиваю обработчики на закрытие попапов по клику на оверлэй
popupProfile.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('popup__overlay')) {
    closePopup(popupProfile);
  }
});

popupPlace.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('popup__overlay')) {
    closePopup(popupPlace);
  }
});

popupImages.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('popup__overlay')) {
    closePopup(popupImages);
  }
});

// объект валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

// вызываю функцию валидации
//enableValidation(validationConfig);

/* const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

formList.forEach((formElement) => {
  const formValidate = new FormValidator(validationConfig, formElement);
  formValidate.enableValidation();
}) */

// вызываю валидацию обоих форм
const profileFormValidation = new FormValidator(validationConfig, formEditElement);
profileFormValidation.enableValidation();

const addFormCardValidation = new FormValidator(validationConfig, formNewCardElement);
addFormCardValidation.enableValidation();

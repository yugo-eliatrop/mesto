
import Card from "./Card.js";
import { FormValidator } from "./FormValidator.js";

// попапы
const popupProfile = document.querySelector('.popup_content_profile');
const popupPlace = document.querySelector('.popup_content_elements');
const popupImages = document.querySelector('.popup_content_images');

// кнопки открытия попапов
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

// коллекция кнопок закрытия попапов по крестику
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

// коллекция попапов
const popupElementList = Array.from(document.querySelectorAll('.popup'));

// создаю пустой контейнер, чтобы вложить карточки в секцию elements
const cardsContainer = document.querySelector('.elements__cards');

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

// функция добавления карточек через создание экземпляра класса Card
function handleSubmitAddForm (evt) {
  evt.preventDefault();
  const cardData = {name: namePlace.value, link: linkImage.value};
  // вызываю функцию создания и добавления карточки
  addCard(createCard(cardData));
  closePopup(popupPlace);
  // вызываю метод объекта валидации формы
  cardFormValidation.disableSubmitButton();
  formNewCardElement.reset();
}

// функция создания карточки
function createCard (cardData) {
  const newCard = new Card(cardData, '.template__elements', openPopupImages);
  return newCard.createCard();
}

// функция добавления карточки в DOM
function addCard (newCard) {
  cardsContainer.prepend(newCard);
}

// перебираю массив карточек
initialCards.forEach((cardData) => {
  // вызываю функцию создания и добавления карточки в DOM
  addCard(createCard(cardData));
});

// функция открытия попапа картинки
function openPopupImages(name, link) {
  popupImageContent.src = link;
  popupImageContent.alt = name;
  popupFigcaption.textContent = name;
  openPopup(popupImages);
 }

// функция добавления карточек с помощью Card.js
/* initialCards.forEach((cardData) => {
  // создаю экземпляр карточки
  const newCard = new Card(cardData, '.template__elements', openPopupImages);
  // создаю карточку и возвращаю наружу
  const cardElement = newCard.createCard();
  // добавляю карточки в DOM
  cardsContainer.prepend(cardElement);
}); */

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

// перебираю коллекцию массива попапов методом forEach
popupElementList.forEach((popupElement) => {
  // навешиваю обработчик на закрытие попапов по клику на оверлэй
  popupElement.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__overlay')) {
      closePopup(popupElement);
    };
  });
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

// создаю два объекта валидации обоих форм
// вызываю валидацию обоих форм
const profileFormValidation = new FormValidator(validationConfig, formEditElement);
profileFormValidation.enableValidation();

const cardFormValidation = new FormValidator(validationConfig, formNewCardElement);
cardFormValidation.enableValidation();

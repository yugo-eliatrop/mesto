// попапы
export const popupProfile = document.querySelector('.popup_content_profile');
export const popupPlace = document.querySelector('.popup_content_elements');
export const popupImages = document.querySelector('.popup_content_images');
export const popupAvatar = document.querySelector('.popup_content_avatar');
export const popupDeleteConfirm = document.querySelector('.popup_delete_confirm');

// кнопки открытия попапов
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');
export const profileAvatarButton = document.querySelector('.profile__avatar-button');

export const templateElement = document.querySelector('.template__elements').content;
export const cardDeleteButton = templateElement.querySelector('.elements__delete-button');

// коллекция кнопок закрытия попапов по крестику
export const popupButtonCloseList = document.querySelectorAll('.popup__close-button');

// форма добавления данных
export const formEditElement = popupProfile.querySelector('.popup__form');
export const nameInput = popupProfile.querySelector('.popup__input_data_name');
export const jobInput = popupProfile.querySelector('.popup__input_data_profession');
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const profileAvatar = document.querySelector('.profile__avatar');

// форма добавления новых карточек
export const formNewCardElement = popupPlace.querySelector('.popup__form');
export const formAvatarElement = popupAvatar.querySelector('.popup__form');
export const formConfirmElement = popupDeleteConfirm.querySelector('.popup__form');
export const namePlaceInput = popupPlace.querySelector('.popup__input_data_place');
export const linkImageInput = popupPlace.querySelector('.popup__input_link_image');
export const cardText = document.querySelector('.elements__card-text');
export const cardImage = document.querySelector('.elements__card-image');

export const cardElement = document.querySelector('.elements__card');

// коллекция попапов
export const popupElementList = Array.from(document.querySelectorAll('.popup'));

// создаю пустой контейнер, чтобы вложить карточки в секцию elements
export const containerSelector = '.elements__cards';
export const cardsContainer = document.querySelector('.elements__cards');

// объект валидации
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};


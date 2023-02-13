
import Card from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { initialCards } from "../utils/initialCards.js";
import { validationConfig, popupProfile, popupPlace,
         popupImages, nameInput, jobInput, profileEditButton, namePlace, linkImage,
         profileAddButton, formEditElement, formNewCardElement, containerSelector,
} from "../utils/constants.js";

// инстанс попапа формы редактирования профиля
const classPopupEditProfile = new PopupWithForm({
  popupSelector: popupProfile,
  handleSubmitForm: handleSubmitEditForm
});

classPopupEditProfile.setEventListeners();

 // инстанс попапа формы добавления карточек
const classPopupAddPlace = new PopupWithForm({
  popupSelector: popupPlace,
  handleSubmitForm: handleSubmitAddForm
});

/* const classPopupAddPlace = new PopupWithForm({
  popupSelector: popupPlace,
  handleSubmitForm: (item) => {
    classCardList.addItem(createCard(item));
    classPopupAddPlace.close();
  }
}); */

classPopupAddPlace.setEventListeners();

// создаю класс добавления карточек в DOM
const classCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    // добавляю созданные карточки в DOM
    classCardList.addItem(createCard(item));
  }
}, containerSelector);

classCardList.renderItems();

// инстанс попапа картинки
const classPopupImages = new PopupWithImage(popupImages);
classPopupImages.setEventListeners();

// функция открытия попапа картинки
function openPopupImages(name, link) {
  classPopupImages.open(name, link);
}

// слушатель открытия попапа картинки
classPopupImages.addEventListener('click', () => {
  classPopupImages.open(name, link);
});

// инстанс ввода данных пользователем
const classUserAboutInfo = new UserInfo({
  nameSelector: nameInput,
  jobSelector: jobInput,
  });

// слушатель на открытие попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
  classPopupEditProfile.open();
});

// слушатель на открытие попапа добавления карточек
profileAddButton.addEventListener('click', () => {
  classPopupAddPlace.open();
});

function handleSubmitEditForm(dataUser) {
  classUserAboutInfo.setUserInfo(dataUser);
  classPopupEditProfile.close();
}

function handleSubmitAddForm() {
  const cardData ={
    name: namePlace.value,
    link: linkImage.value
  };
  addCard(createCard(cardData));
}

// функция создания карточки
function createCard (cardData) {
  const newCard = new Card(cardData, '.template__elements', openPopupImages);
  return newCard.createCard();
}

// функция добавления карточки в DOM
/* function addCard (newCard) {
  cardsContainer.prepend(newCard);
} */

// перебираю массив карточек
/* initialCards.forEach((cardData) => {
  // вызываю функцию создания и добавления карточки в DOM
  addCard(createCard(cardData));
}); */


/* // обработчики на открытие попапов
profileEditButton.addEventListener('click', openEditPopup);
profileAddButton.addEventListener('click', openAddPopup);

// обработчики на сабмитные кнопки
formEditElement.addEventListener('submit', handleSubmitEditForm);
formNewCardElement.addEventListener('submit', handleSubmitAddForm); */

// создаю два объекта валидации обоих форм
// вызываю валидацию обоих форм
const profileFormValidation = new FormValidator(validationConfig, formEditElement);
profileFormValidation.enableValidation();

const cardFormValidation = new FormValidator(validationConfig, formNewCardElement);
cardFormValidation.enableValidation();

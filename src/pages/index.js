
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
         profileTitle, profileSubtitle
} from "../utils/constants.js";
import './index.css'

// инстанс попапа формы редактирования профиля
const popupEditProfile = new PopupWithForm({
  popupSelector: popupProfile,
  handleSubmitForm: handleSubmitEditForm
});

// слушатель открытия попапа редактирования профиля
popupEditProfile.setEventListeners();

 // инстанс попапа формы добавления карточек
const popupAddPlace = new PopupWithForm({
  popupSelector: popupPlace,
  handleSubmitForm: handleSubmitAddForm
});

// слушатель открытия попапа добавления карточки
popupAddPlace.setEventListeners();

// создаю копию класса добавления карточек в DOM
const cardListSection = new Section({
  items: initialCards,
  renderer: (item) => {
    // добавляю созданные карточки в DOM
    cardListSection.addItem(createCard(item));
  }
}, containerSelector);

// вызываю метод рендеринга карточек класса Section
cardListSection.renderItems();

// инстанс попапа картинки
const popupZoomImages = new PopupWithImage(popupImages);

// функция открытия попапа картинки
function handleCardClick(name, link) {
  popupZoomImages.open(name, link);
}

// слушатель открытия попапа картинки
popupZoomImages.setEventListeners();

// инстанс ввода данных пользователем
const userAboutInfo = new UserInfo({
  dataName: profileTitle,
  dataJob: profileSubtitle,
  });

// слушатель на открытие попапа добавления карточек
profileAddButton.addEventListener('click', () => {
  popupAddPlace.open();
});

function handleSubmitEditForm({ name, job }) {
  userAboutInfo.setUserInfo({
    dataName: name,
    dataJob: job
  });
  popupEditProfile.close();
  profileFormValidation._toggleButtonState();
}

function handleSubmitAddForm({ placeName, linkPicture }) {
  cardListSection.addItem(createCard({
    name: placeName,
    link: linkPicture
  }));
  popupAddPlace.close();
  cardFormValidation._toggleButtonState();
}

// функция создания карточки
function createCard (cardData) {
  const newCard = new Card(cardData, '.template__elements', handleCardClick);
  return newCard.createCard();
}

// слушатель на открытие попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
  // вызываю метод получения данных и кладу в переменную
  const { dataName, dataJob } = userAboutInfo.getUserInfo();
  popupEditProfile.setInputValues({ // подставляю в попап информацию из профиля
    name: dataName,
    job: dataJob
  });

  popupEditProfile.open();
});

// создаю два объекта валидации обоих форм
// вызываю валидацию обоих форм
const profileFormValidation = new FormValidator(validationConfig, formEditElement);
profileFormValidation.enableValidation();

const cardFormValidation = new FormValidator(validationConfig, formNewCardElement);
cardFormValidation.enableValidation();

import Card from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupConfirmation } from "../components/PopupConfirmation.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import {
  validationConfig,
  popupProfile,
  popupPlace,
  popupImages,
  nameInput,
  jobInput,
  profileEditButton,
  namePlaceInput,
  linkImageInput,
  popupAvatar,
  popupDeleteConfirm,
  profileAvatarButton,
  profileAddButton,
  formEditElement,
  formNewCardElement,
  containerSelector,
  profileTitle,
  profileSubtitle,
  profileAvatar,
  formAvatarElement,
  cardElement,
} from "../utils/constants.js";
import "./index.css";
import { ids } from "webpack";
let userId;

// инстанс апи
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "e976c748-5d06-45dd-8bfc-a73469c32b5f",
    "Content-Type": "application/json",
  },
});

// инстанс ввода данных пользователем
const userAboutInfo = new UserInfo({
  dataName: profileTitle,
  dataAbout: profileSubtitle,
  dataAvatar: profileAvatar,
});

// инстанс попапа формы редактирования профиля
const popupEditProfile = new PopupWithForm({
  popupSelector: popupProfile,
  handleSubmitForm: handleSubmitEditForm,
});

// слушатель открытия попапа редактирования профиля
popupEditProfile.setEventListeners();

// инстанс попапа формы добавления карточек
const popupAddPlace = new PopupWithForm({
  popupSelector: popupPlace,
  handleSubmitForm: handleSubmitAddForm,
});

// слушатель открытия попапа добавления карточки
popupAddPlace.setEventListeners();

// инстанс редактипрования попапа аватара
const popupAddAvatar = new PopupWithForm({
  popupSelector: popupAvatar,
  handleSubmitForm: handleSubmitAddAvatar,
});

// слушатель редактирования попапа аватара
popupAddAvatar.setEventListeners();

const popupConfirm = new PopupConfirmation({
  popupSelector: popupDeleteConfirm,
  handleSubmitForm: (newCard) => {
    api
      .deleteCard(newCard._id)
      .then(() => {
        newCard.remove();
        popupConfirm.close();
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

popupConfirm.setEventListeners();
// создаю копию класса добавления карточек в DOM

const cardListSection = new Section(
  {
    renderer: (items) => {
      cardListSection.addItem(createCard(items));
    },
  },
  containerSelector
);

// инстанс попапа картинки
const popupZoomImages = new PopupWithImage(popupImages);

function handleCardDelete(cardElement) {
  popupConfirm.handleCard(cardElement);
  popupConfirm.open();
}

// функция открытия попапа картинки
function handleCardClick(name, link) {
  popupZoomImages.open(name, link);
}

// слушатель открытия попапа картинки
popupZoomImages.setEventListeners();

async function handleSubmitEditForm({ name, about }) {
  try {
    const profileUser = await api.setUserInfoProfile({ name, about });
    userAboutInfo.setUserInfo(profileUser);
  } catch (err) {
    console.log(err);
  }
}

async function handleSubmitAddForm({ placeName, linkPicture }) {
  try {
    const newCardElement = await api.addNewCard({ placeName, linkPicture });
    cardListSection.addItem(createCard(newCardElement));
  } catch (err) {
    console.log(err);
  }
}

// колбэк редактирования аватара
async function handleSubmitAddAvatar(avatar) {
  try {
    const profileUser = await api.editUserAvatar(avatar);
    userAboutInfo.setUserAvatar(profileUser);
  } catch (err) {
    console.log(err);
  }
}

// функция создания карточки
function createCard(cardData) {
  const newCard = new Card(
    cardData,
    ".template__elements",
    handleCardClick,
    handleCardDelete,
    userId,
    // используя try..catch ловлю ошибки
    async () => {
      try {
        const response = await api.addlikeCard(cardData._id);
        newCard.setLike();
        newCard.countLikes(response);
      } catch (err) {
        return console.log(err);
      }
    },
    async () => {
      try {
        const response = await api.deleteCardLike(cardData._id);
        newCard.removeLike();
        newCard.countLikes(response);
      } catch (err) {
        return console.log(err);
      }
    },
    () => {
      popupConfirm.open(cardElement);
    }
  );
  return newCard.createCard();
}

// промис для создания карточек
/* Promise.all([api.getUserInfo(), api.getInitialCards()])
.then((res) => {
  const initialCards = res[0];
  const user = res[1];

  userAboutInfo.setUserAvatar(user.avatar);
  userAboutInfo.setUserInfo(user);
  userAboutInfo.id = user._id;

  cardListSection.renderItems(createCard(initialCards, userAboutInfo.id));
}).catch((err) => {
  console.log((err));
}); */

// промис отрисовывает карточки с сервера
// и данные пользователя
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([profileUser, initialCards]) => {
    userAboutInfo.setUserInfo(profileUser);
    userAboutInfo.setUserAvatar(profileUser.avatar);
    userId = profileUser._id;

    cardListSection.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(err);
  });

// слушатель на открытие попапа редактирования профиля
profileEditButton.addEventListener("click", () => {
  // вызываю метод получения данных и кладу в переменную
  const { dataName, dataAbout } = userAboutInfo.getUserInfo();
  popupEditProfile.setInputValues({
    // подставляю в попап информацию из профиля
    name: dataName,
    about: dataAbout,
  });
  profileFormValidation.disableSubmitButton();
  popupEditProfile.open();
});

// слушатель на открытие попапа добавления карточек
profileAddButton.addEventListener("click", () => {
  cardFormValidation.disableSubmitButton();
  popupAddPlace.open();
});

// слушатель на открытие попапа редактирования аватара
profileAvatarButton.addEventListener("click", () => {
  const { dataAvatar } = userAboutInfo.getUserInfo();
  popupAddAvatar.setInputValues({
    avatar: dataAvatar,
  });
  avatarFormValidation.disableSubmitButton();
  popupAddAvatar.open();
});

// создаю два объекта валидации обоих форм
// вызываю валидацию обоих форм
const profileFormValidation = new FormValidator(
  validationConfig,
  formEditElement
);
profileFormValidation.enableValidation();

const cardFormValidation = new FormValidator(
  validationConfig,
  formNewCardElement
);
cardFormValidation.enableValidation();

const avatarFormValidation = new FormValidator(
  validationConfig,
  formAvatarElement
);
avatarFormValidation.enableValidation();

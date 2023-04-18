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
  formAvatarElement
} from "../utils/constants.js";
import "./index.css";
let userId;

// инстанс апи
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/plus-cohort-23",
  headers: {
    authorization: "8e6d025a-6054-4076-a0d4-21047d048aad",
    "Content-Type": "application/json",
  },
});

// инстанс ввода данных пользователем
const userAboutInfo = new UserInfo({
  name: profileTitle,
  about: profileSubtitle,
  avatar: profileAvatar,
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
  handleSubmitForm: async (newCard) => {
    api
      .deleteCard(newCard._id)
      .then(() => {
        newCard.handleCardDelete()
        popupConfirm.close()
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

popupConfirm.setEventListeners();

function handleCardDeleteClick(newCard) {
  popupConfirm.handleCard(newCard);
  popupConfirm.open();
}

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

// функция открытия попапа картинки
function handleCardClick(name, link) {
  popupZoomImages.open(name, link);
}

// слушатель открытия попапа картинки
popupZoomImages.setEventListeners();

async function handleSubmitEditForm(data) {
  try {
    const profileUser = await api.setUserInfoProfile({
      name: data.name,
      about: data.about
    });

    userAboutInfo.setUserInfo(profileUser);
  } catch (err) {
    console.log(err);
  }
}

// колбэк редактирования аватара
async function handleSubmitAddAvatar(data) {
  try {
    const profileUser = await api.editUserAvatar({
      avatar: data.avatar
    });

    userAboutInfo.setUserAvatar(profileUser);
  } catch (err) {
    console.log(err);
  }
}

async function handleSubmitAddForm(data) {
  try {
    const newCard = await api.createNewCard({
      name: data.name,
      link: data.link
    });

    cardListSection.addItem(createCard(newCard));
  } catch (err) {
    console.log(err);
  }
}

function handleCardLike(newCard) {
  if (newCard.like) {
    api.deleteCardLike(newCard._id)
    .then((data) => {
      newCard.countLikes(data.likes);
      // меняю состояние лайков
      newCard.toggleLikeState();
      newCard.removeLike();
    })
    .catch((err) => {
      console.log(err);
    })
  } else {
    api.addlikeCard(newCard._id)
    .then((data) => {
      newCard.setLike();
      // вызываю метод плдсчитывающий количество лайков
      newCard.countLikes(data.likes);
      // меняю состояние лайков
      newCard.toggleLikeState();
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

// функция создания карточки
function createCard(cardData) {
  const newCard = new Card(
    cardData,
    ".template__elements",
    handleCardClick,
    handleCardDeleteClick,
    handleCardLike,
    userId);

    return newCard.createCard();
  }

// промис отрисовывает карточки с сервера
// и данные пользователя
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([profileUser, initialCards]) => {
    userAboutInfo.setUserInfo(profileUser);
    userAboutInfo.setUserAvatar(profileUser);
    userId = profileUser._id;

    cardListSection.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(err);
  });

// слушатель на открытие попапа редактирования профиля
profileEditButton.addEventListener("click", () => {
  // вызываю метод получения данных
  popupEditProfile.setInputValues(userAboutInfo.getUserInfo());

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

  popupAddAvatar.setInputValues(userAboutInfo.getUserInfo());
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

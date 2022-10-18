
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
const defaultCards = [
  {
    name: 'Карачаевск',
    link: 'images/karachaevsk.jpg'
  },
  {
    name: 'Гора Эльбрус',
    link: 'images/elbrus.jpg'
  },
  {
    name: 'Домбай',
    link: 'images/dombai.jpg'
  },
  {
    name: 'Гора Эльбрус',
    link: 'images/elbrus.jpg'
  },
  {
    name: 'Домбай',
    link: 'images/dombai.jpg'
  },
  {
    name: 'Карачаево-Черкессия',
    link: 'images/karachaevsk.jpg'
  }
];
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
const templateElement = document.querySelector('.template__elements');
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
  popupImageContent.src = url;
  popupImageContent.alt = name;
  popupFigcaption.textContent = name;
  openPopup(popupImages);
}

// с помощью метода forEach карточки загружаются при рендеринге
defaultCards.forEach(openPopupImages);

// создаю пустой контейнер, чтобы вложить карточки в секцию elements
const cardContainer = document.querySelector('.elements__cards');

// функция добавления карточек и лайка
function createCard(cardData) {
  const {link, name} = cardData;
  const newCardElement = templateElement.content.cloneNode(true);
  newCardElement.querySelector('.elements__card-text').textContent = name;
  newCardElement.querySelector('.elements__card-image').src = link;
  newCardElement.querySelector('.elements__like-button_active').alt = name;
  return newCardElement;
}

initialCards.forEach(data => {
  const newCard = createCard(data)
cardContainer.prepend(newCard);
});

// функция добавления и удаления лайка
function toggleLikeButton() {
  newCardElement.querySelector('.elements__like-button_active').alt = name;
  newCardElement.classList.toggle();
}

// функция закрытия карточки
function deleteCards() {
  newCardElement
   .querySelector('.elements__delete-button_active')
   .addEventListener('click', (evt) => {
    const cardContainer = evt.target.closest('.elements__card');
    cardContainer(remove);
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
